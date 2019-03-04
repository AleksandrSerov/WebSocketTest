import uuidv1 from "uuid/v1";
import qs from "qs";

const SOCKET_CONNECTING = 0;
const SOCKET_OPEN = 1;
const SOCKET_CLOSING = 2;
const SOCKET_CLOSED = 3;

const PING_SEND_TIMEOUT = 10000;
const PONG_WAIT_TIMEOUT = 5000;
const SOCKET_RECONNECT_TIMEOUT = 5000;
const SOCKET_SEND_TIMEOUT = 1000;

export default class SocketClient {
  static systemEvents = [
    "error",
    "open",
    "close",
    "join",
    "leave",
    "connect",
    "disconnect"
  ];
  constructor(url = null, query = {}) {
    this.socket = null;
    this.state = null;
    this.timer = null;
    this.reconnectAttempts = 0;
    this.client_id = uuidv1();
    this.rooms = query.rooms || [];
    this.url = "wss://test.devpizzasoft.ru/socket.io/";

    // Инициализирует счетчик джоинов в каждую комнату
    this.roomsCount =
      this.rooms &&
      this.rooms.reduce((result, room) => ({ ...result, [room]: 1 }), {});

    // Инициализирует список обработчиков системных событий вида:
    // {
    //   event: [cb1, cb2]
    // }
    this.systemEvents = SocketClient.systemEvents.reduce(
      (events, eventName) => ({ ...events, [eventName]: [] }),
      {}
    );
    // Инициализирует список обработчиков событий по комнатам вида:
    // {
    //   room: {
    //     event: [cb1, cb2]
    //   }
    // }
    this.events =
      this.rooms &&
      this.rooms.reduce(
        (result, room) => ({
          ...result,
          [room]: { msg: [] }
        }),
        {}
      );
  }

  ping = () => {
    this.socket.send(JSON.stringify({ type: "ping", data: "ping" }));
  };

  fireEvent = ({ room, event = "msg", data }) => {
    console.log(`RoomFE ${room}`);
    console.log(`EventFE ${event}`);
    console.log(`DataFE `);
    console.log(data);

    if (SocketClient.systemEvents.includes(event)) {
      // Если пришедшее событие есть в системных,
      // выполняет соответствующий обработчик для него
      this.systemEvents[event].forEach(cb => {
        cb(data);
      });
    } else if (!this.events[room]) {
      // Если в списке всех событий нет комнаты room,
      // пишет сообщение об ошибке
      console.error(`Not found room ${room}`);
    } else if (!this.events[room][event]) {
      //   Если среди событий есть эта комната, но нет события этой комнаты
      // То пишет сообщение в консоль
      console.error(`Not found events ${event} in room ${room}`);
    } else {
      // Если событие и комната валидны, выполняет обработчик события
      this.events[room][event].forEach(cb => {
        cb(data);
      });
    }
  };

  transition = nextState => {
    clearTimeout(this.timer);
    const prevState = this.state;
    this.state = nextState;

    switch (nextState) {
      case "OPEN": {
        console.log("transition: OPEN");
        this.open();
        this.timer = setTimeout(() => {
          this.transition("RECONNECT");
        }, PONG_WAIT_TIMEOUT);
        break;
      }
      case "PING": {
        this.ping();
        this.timer = setTimeout(() => {
          this.transition("RECONNECT");
        }, PONG_WAIT_TIMEOUT);
        break;
      }
      case "RECONNECT": {
        if (this.socket) {
          this.socket.close();
        }
        this.timer = setTimeout(() => {
          this.reconnectAttempts++;
          this.transition("OPEN");
        }, SOCKET_RECONNECT_TIMEOUT);
        break;
      }
      case "PONG": {
        if (prevState === "OPEN" && this.reconnectAttempts > 0) {
          this.fireEvent({ event: "connect" });
        }
        this.reconnectAttempts = 0;
        this.timer = setTimeout(() => {
          this.transition("PING");
        }, PING_SEND_TIMEOUT);
        break;
      }
      default:
        break;
    }
  };

  open = token => {
    this.client_id = uuidv1();
    if (token) {
      this.token = token;
    }
    const query = {
      token,
      client_id: this.client_id,
      room: this.rooms && this.rooms.join(",")
    };
    try {
      this.socket = new WebSocket(`${this.url}?${qs.stringify(query)}`);
      this.socket.onmessage = this.onMessage;
      this.socket.onopen = this.onOpen;
      //   this.socket.onerror = this.onError;
      //   this.socket.onclose = this.onClose;
      setTimeout(() => {
        this.ping();
      }, PING_SEND_TIMEOUT);
    } catch (error) {
      console.error("Error while opening socket connection", error);
    }
  };

  onMessage = request => {
    try {
      const message = JSON.parse(request.data);
      if (message.pong) {
        this.transition("PONG");
        return;
      }
      if (message.error) {
        console.error(message.error);
      }
      if (message.room) {
        console.log(message.room);
        this.send({
          type: "confirm",
          i: message.data.i
        });
        console.log("FireEvent");
        this.fireEvent({
          room: message.room,
          event: "msg",
          data: message.data
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log("PING");
        }, PING_SEND_TIMEOUT);
      }
    } catch (error) {
      console.log(`Catch ${error}`);
    }
  };

  send = data => {
    if (!this.socket) return;
    const { socket } = this;
    const timeoutSend = () => {
      if (
        socket.readyState === SOCKET_CLOSING ||
        socket.readyState === SOCKET_CLOSED
      ) {
        return;
      }
      if (socket.readyState === SOCKET_CONNECTING) {
        setTimeout(() => {
          timeoutSend();
        }, SOCKET_SEND_TIMEOUT);
      }
      if (socket.readyState === SOCKET_OPEN) {
        socket.send(JSON.stringify(data));
      }
    };
    timeoutSend();
  };

  onOpen = () => {
    this.fireEvent({
      event: "open",
      data: {
        isReconnecting: this.reconnectAttempts > 0
      }
    });
  };

  join = room => {
    if (!this.rooms.includes(room)) {
      this.roomsCount[room] = 1;
      this.rooms.push(room);
      this.events[room] = {
        msg: []
      };
      console.log(`Join: ${room}`);
      this.send({ type: "join", room });
      this.fireEvent({
        room,
        event: "join",
        data: {
          room
        }
      });
    } else {
      this.roomsCount[room] += 1;
    }

    return this;
  };

  on = ({ room, event = "msg", cb }) => {
    if (SocketClient.systemEvents.includes(event)) {
      this.systemEvents[event].push(cb);
    } else if (!this.rooms.includes(room)) {
      console.log(`Not found room ${room}`);
    } else if (!this.events[room][event]) {
      this.events[room][event] = [cb];
    } else {
      this.events[room][event].push(cb);
    }
    return this;
  };
}

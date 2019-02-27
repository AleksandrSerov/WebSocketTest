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

export default class Socket {
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
    this.url = "wss://test.devpizzasoft.ru/socket.io/";

    this.systemEvents = Socket.systemEvents.reduce(
      (events, eventName) => ({ ...events, [eventName]: [] }),
      {}
    );
  }

  ping = () => {
    this.socket.send(JSON.stringify({ type: "ping", data: "ping" }));
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
          this.fireEvent({ event: "disconnect" });
          this.transition("RECONNECT");
        }, PONG_WAIT_TIMEOUT);
        break;
      }
      case "RECONNECT": {
        if (this.socket) {
          this.socket.close();
        }
        this.timer = setTimeout(() => {
          this.reconnectAttempts += 1;
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

  fireEvent = ({ room, event, data }) => {
    if (Socket.systemEvents.includes(event)) {
      this.systemEvents[event].forEach(cb => {
        cb(data);
      });
    } else if (!this.event[room]) {
      console.error(`Not found room ${room}`);
    } else if (!this.events[room][event]) {
      console.error(`Not found events ${event} in room ${room}`);
    } else {
      this.events[room][event].forEach(cb => {
        cb(data);
      });
    }
  };
  open = token => {
    if (token) {
      this.token = token;
    }
    const query = {
      token,
      client_id: this.client_id,
      room: ""
    };
    try {
      this.socket = new WebSocket(`${this.url}?${qs.stringify(query)}`);
      //   this.socket.onerror = this.onError;
      this.socket.onmessage = this.onMessage;
      this.socket.onopen = this.onOpen;
      //   this.socket.onclose = this.onClose;
      setTimeout(() => {
        this.ping();
      }, PONG_WAIT_TIMEOUT);
    } catch (error) {
      console.error("Error while opening socket connection", error);
    }
  };
  onOpen = () => {
    this.fireEvent({
      event: "open",
      data: {
        isReconnecting: this.reconnectAttempts > 0
      }
    });
  };

  onMessage = request => {
    try {
      const message = JSON.parse(request.data);
      if (message.pong) {
        console.log("PONG");
      }
      if (message.error) {
        console.error(message);
      }
      if (message.room) {
        console.log(message.room);
        return message;
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
  join = room => {
    this.send({ type: "join", room });
    return this;
  };
}

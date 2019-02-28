import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const createReducer = asyncReducers => {
  console.log(rootReducer);

  combineReducers({ ...rootReducer, ...asyncReducers });
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getStore = initialReducers => {
  createStore(
    createReducer(initialReducers),
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default getStore;

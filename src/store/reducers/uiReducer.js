import { handleActions } from "redux-actions";
import actions from "../actions";
import { combineReducers } from "redux";

export const isFetching = handleActions(
  {
    [actions.fetchRequest]() {
      return true;
    }
  },
  false
);

export default combineReducers({
  isFetching
});

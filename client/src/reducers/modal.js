import * as types from '../actions/actionTypes';

export default (state = false, action) => {
  switch(action.type) {
    case types.TOGGLE_MODAL:
      return !state;
    default:
      return state;
  }
}
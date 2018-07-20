import { userConstants } from '../_constants';
 
const initialState = {registered: false, registering: false};

export function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {registered: true, user: action.user};
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}
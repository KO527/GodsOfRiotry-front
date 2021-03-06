import { userConstants } from '../constants/user.constants';
 
const initialState = {registered: false, registering: false};

export default function(state = initialState, action) {
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
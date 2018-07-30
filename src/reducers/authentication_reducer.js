import { userConstants } from '../constants/user.constants';
 
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {loggedIn: false, loggingIn: false};
 
export default function(state = initialState, action){
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }
    case userConstants.LOGIN_FAILURE:
      return {
        type: action.type
      }
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
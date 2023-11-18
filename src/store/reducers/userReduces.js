import {
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  PUT_EDIT_PROFILE,
  PUT_EDIT_PROFILE_SUCCESS,
  PUT_EDIT_PROFILE_FAILURE,
  GET_CURRENT_USER,
  LOG_OUT,
} from '../actions/actionsTypes';

const initialStateUsers = {
  user: { email: null, token: null, username: null, image: null },
  server: { errors: { username: null, email: null } },
  logged: false,
  loading: false,
  error: null,
};

const userReducer = (state = initialStateUsers, action) => {
  switch (action.type) {
    case POST_REGISTRATION:
    case POST_LOGIN:
    case PUT_EDIT_PROFILE:
      return { ...state, loading: true, error: null };

    case POST_REGISTRATION_SUCCESS:
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        logged: true,
        loading: false,
        error: null,
        server: { errors: { username: null, email: null } },
        user: action.payload,
      };

    case GET_CURRENT_USER:
      return { ...state, logged: true, user: action.payload };

    case PUT_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        server: { errors: { username: null, email: null } },
      };

    case LOG_OUT:
      localStorage.removeItem('token');
      return initialStateUsers;

    case POST_REGISTRATION_FAILURE:
    case POST_LOGIN_FAILURE:
    case PUT_EDIT_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;

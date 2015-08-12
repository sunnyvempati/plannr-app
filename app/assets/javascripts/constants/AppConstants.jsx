import keyMirror from 'keymirror';

const AppConstants = {
  APIEndpoints: {
    LOGIN:                      '/login',
    REGISTER:                   '/sign_up',
    LOGOUT:                     '/logout',
    PROFILE:                    '/profile',
    VERIFY:                     '/verify',
    RESET_PASSWORD_REQUEST:     '/reset_password_request',
    RESET_PASSWORD:             '/reset_password',
  },
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    SIGNUP_REQUEST: null,
    SIGNUP_RESPONSE: null,
    LOGOUT_REQUEST: null,
    LOGOUT_RESPONSE: null,
    PROFILE_REQUEST: null,
    PROFILE_RESPONSE: null,
    VERIFY_REQUEST: null,
    VERIFY_RESPONSE: null,
    RESET_PASSWORD_REQUEST: null,
    RESET_PASSWORD_REQUEST_RESPONSE: null,
    RESET_PASSWORD: null,
    RESET_PASSWORD_RESPONSE: null,

    // Toast
    TOAST_MESSAGE: null,
    TOAST_ERROR: null,
    CLOSE_TOAST: null,

    // Routes
    REDIRECT: null
  })
};

export default AppConstants;

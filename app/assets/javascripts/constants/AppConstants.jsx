import keyMirror from 'keymirror';

const AppConstants = {
  APIEndpoints: {
    LOGIN:           '/login',
    REGISTER:        '/sign_up'
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

    // Routes
    REDIRECT: null
  })
};

export default AppConstants;

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
    GET_USER:                   '/users/',
    GET_USERS:                  '/users',
    GET_EVENTS:                 '/events',
    GET_EVENT:                  '/events/',
    CREATE_EVENT:               '/events',
    UPDATE_EVENT:               '/events/',
    DELETE_EVENTS:              '/destroy_events',
    GET_CONTACTS:               '/contacts',
    CREATE_CONTACT:             '/contacts',
    GET_CONTACT:                '/contacts/',
    GET_VENDORS:                '/vendors',
    CREATE_VENDOR:              '/vendors',
    GET_VENDOR:                 '/vendors/',
    GET_TASKS:                  '/tasks',
    CREATE_TASK:                '/tasks',
    UPDATE_TASK:                '/tasks/',
    DELETE_TASKS:               '/destroy_tasks',
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

    // User
    GET_LOGGED_IN_USER_REQUEST: null,
    GET_LOGGED_IN_USER_RESPONSE: null,
    GET_USER_REQUEST: null,
    GET_USERS_REQUEST: null,
    GET_USER_RESPONSE: null,
    GET_USERS_RESPONSE: null,
    SEARCH_USERS_REQUEST: null,
    SEARCH_USERS_RESPONSE: null,

    // Events
    GET_EVENTS_REQUEST: null,
    GET_EVENTS_RESPONSE: null,
    GET_EVENT_REQUEST: null,
    GET_EVENT_RESPONSE: null,
    GET_CACHED_EVENTS_RESPONSE: null,
    DELETE_EVENT_REQUEST: null,
    DELETE_EVENT_RESPONSE: null,
    SEARCH_EVENTS_REQUEST: null,
    SEARCH_EVENTS_RESPONSE: null,
    CREATE_EVENT_REQUEST: null,
    CREATE_EVENT_RESPONSE: null,
    UPDATE_EVENT_REQUEST: null,
    UPDATE_EVENT_RESPONSE: null,

    // Contacts
    SEARCH_CONTACTS_REQUEST: null,
    SEARCH_CONTACTS_RESPONSE: null,
    CREATE_CONTACT_REQUEST: null,
    CREATE_CONTACT_SUCCESS_RESPONSE: null,
    CREATE_CONTACT_ERROR_RESPONSE: null,
    GET_CONTACT_REQUEST: null,
    GET_CONTACT_RESPONSE: null,
    GET_CONTACTS_REQUEST: null,
    GET_CONTACTS_RESPONSE: null,
    GET_CACHED_CONTACTS_RESPONSE: null,

    // Vendors
    SEARCH_VENDORS_REQUEST: null,
    SEARCH_VENDORS_RESPONSE: null,
    CREATE_VENDOR_REQUEST: null,
    CREATE_VENDOR_SUCCESS_RESPONSE: null,
    CREATE_VENDOR_ERROR_RESPONSE: null,
    GET_VENDOR_REQUEST: null,
    GET_VENDOR_RESPONSE: null,
    GET_VENDORS_REQUEST: null,
    GET_VENDORS_RESPONSE: null,
    GET_CACHED_VENDORS_RESPONSE: null,

    // Tasks
    GET_TASKS_REQUEST: null,
    GET_TASKS_RESPONSE: null,
    UPDATE_TASK_REQUEST: null,
    UPDATE_TASK_SUCCESS_RESPONSE: null,
    UPDATE_TASK_ERROR_RESPONSE: null,
    GET_CACHED_TASKS_RESPONSE: null,
    CREATE_TASK_REQUEST: null,
    CREATE_TASK_SUCCESS_RESPONSE: null,
    CREATE_TASK_ERROR_RESPONSE: null,
    DELETE_TASK_REQUEST: null,
    DELETE_TASK_RESPONSE: null,

    // Toast
    TOAST_MESSAGE: null,
    TOAST_ERROR: null,
    CLOSE_TOAST: null,

    // Modal
    OPEN_MODAL: null,
    CLOSE_MODAL: null,

    // Error
    RESET: null,

    // Routes
    REDIRECT: null
  })
};

export default AppConstants;

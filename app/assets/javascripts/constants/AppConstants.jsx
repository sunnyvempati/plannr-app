import keyMirror from 'keymirror';

const AppConstants = {
  APIEndpoints: {
    LOGIN:                      '/login',
    REGISTER:                   '/sign_up',
    LOGOUT:                     '/logout',
    PROFILE:                    '/profile',
    VERIFY:                     '/verify',
    RESEND_VERIFY:              '/resend_verify',
    RESET_PASSWORD_REQUEST:     '/reset_password_request',
    RESET_PASSWORD:             '/reset_password',
    GET_USER:                   '/users/',
    GET_USERS:                  '/users',
    UPDATE_USER:                '/users/',
    DELETE_USERS:               '/destroy_users',
    GET_EVENTS:                 '/events',
    GET_EVENT:                  '/events/',
    CREATE_EVENT:               '/events',
    UPDATE_EVENT:               '/events/',
    DELETE_EVENTS:              '/destroy_events',
    GET_CONTACTS:               '/contacts',
    CREATE_CONTACT:             '/contacts',
    GET_CONTACT:                '/contacts/',
    UPDATE_CONTACT:             '/contacts/',
    DELETE_CONTACTS:            '/destroy_contacts',
    GET_VENDORS:                '/vendors',
    CREATE_VENDOR:              '/vendors',
    UPDATE_VENDOR:              '/vendors/',
    GET_VENDOR:                 '/vendors/',
    DELETE_VENDORS:             '/destroy_vendors',
    GET_TASKS:                  '/tasks',
    CREATE_TASK:                '/tasks',
    UPDATE_TASK:                '/tasks/',
    DELETE_TASKS:               '/destroy_tasks',
    GET_EVENT_CONTACTS:         '/event_contacts',
    CREATE_EVENT_CONTACT:       '/event_contacts',
    DELETE_EVENT_CONTACTS:      '/destroy_event_contacts',
    DELETE_EVENT_VENDORS:       '/destroy_event_vendors',
    GET_EVENT_VENDORS:          '/event_vendors',
    CREATE_EVENT_VENDOR:        '/event_vendors',
    CREATE_ATTACHMENT:          '/attachments',
    GET_ATTACHMENTS:            '/attachments',
    DELETE_ATTACHMENTS:         '/destroy_event_attachments',
    CREATE_COMMENT:             '/comments',
    UPDATE_COMMENT:             '/comments/',
    GET_COMMENTS:               '/comments',
    DELETE_COMMENT:             '/comments/',
    CREATE_INVITE:              '/invitations',
    GET_INVITE:                 '/invitation_by_token',
    FEEDBACK:                   '/feedback'
  },
  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  AdminActions: keyMirror({
    FETCH_USER_INFOS: null,
    FETCH_USER_INFOS_RESPONSE: null,
    FETCH_COMPANY_INFOS: null,
    FETCH_COMPANY_INFOS_RESPONSE: null
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
    RESEND_VERIFY_REQUEST: null,
    RESEND_VERIFY_SUCCESS_RESPONSE: null,
    RESEND_VERIFY_ERROR_RESPONSE: null,
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
    UPDATE_USER_REQUEST: null,
    UPDATE_USER_RESPONSE: null,
    DELETE_USERS_REQUEST: null,
    DELETE_USERS_RESPONSE: null,


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
    CREATE_EVENT_SUCCESS_RESPONSE: null,
    CREATE_EVENT_ERROR_RESPONSE: null,
    UPDATE_EVENT_REQUEST: null,
    UPDATE_EVENT_SUCCESS_RESPONSE: null,
    UPDATE_EVENT_ERROR_RESPONSE: null,

    // Contacts
    SEARCH_CONTACTS_REQUEST: null,
    SEARCH_CONTACTS_RESPONSE: null,
    CREATE_CONTACT_REQUEST: null,
    CREATE_CONTACT_SUCCESS_RESPONSE: null,
    CREATE_CONTACT_ERROR_RESPONSE: null,
    UPDATE_CONTACT_REQUEST: null,
    UPDATE_CONTACT_SUCCESS_RESPONSE: null,
    UPDATE_CONTACT_ERROR_RESPONSE: null,
    GET_CONTACT_REQUEST: null,
    GET_CONTACT_RESPONSE: null,
    GET_CONTACTS_REQUEST: null,
    GET_CONTACTS_RESPONSE: null,
    GET_CACHED_CONTACTS_RESPONSE: null,
    DELETE_CONTACTS_REQUEST: null,
    DELETE_CONTACTS_RESPONSE: null,

    // Vendors
    SEARCH_VENDORS_REQUEST: null,
    SEARCH_VENDORS_RESPONSE: null,
    CREATE_VENDOR_REQUEST: null,
    CREATE_VENDOR_SUCCESS_RESPONSE: null,
    CREATE_VENDOR_ERROR_RESPONSE: null,
    UPDATE_VENDOR_REQUEST: null,
    UPDATE_VENDOR_SUCCESS_RESPONSE: null,
    UPDATE_VENDOR_ERROR_RESPONSE: null,
    GET_VENDOR_REQUEST: null,
    GET_VENDOR_RESPONSE: null,
    GET_VENDORS_REQUEST: null,
    GET_VENDORS_RESPONSE: null,
    GET_CACHED_VENDORS_RESPONSE: null,
    DELETE_VENDORS_REQUEST: null,
    DELETE_VENDORS_RESPONSE: null,

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

    // Event Contacts
    GET_EVENT_CONTACTS_REQUEST: null,
    GET_EVENT_CONTACTS_RESPONSE: null,
    CREATE_EVENT_CONTACT_REQUEST: null,
    CREATE_EVENT_CONTACT_RESPONSE: null,
    DELETE_EVENT_CONTACTS_REQUEST: null,
    DELETE_EVENT_CONTACTS_RESPONSE: null,

    // Event Vendors
    GET_EVENT_VENDORS_REQUEST: null,
    GET_EVENT_VENDORS_RESPONSE: null,
    CREATE_EVENT_VENDOR_REQUEST: null,
    CREATE_EVENT_VENDOR_RESPONSE: null,
    DELETE_EVENT_VENDORS_REQUEST: null,
    DELETE_EVENT_VENDORS_RESPONSE: null,

    // Attachments
    CREATE_EVENT_ATTACHMENT_REQUEST: null,
    CREATE_EVENT_ATTACHMENT_RESPONSE: null,
    GET_ATTACHMENTS_REQUEST: null,
    GET_ATTACHMENTS_RESPONSE: null,
    DELETE_ATTACHMENTS_REQUEST: null,
    DELETE_ATTACHMENTS_RESPONSE: null,

    // Comments
    CREATE_COMMENT_REQUEST: null,
    UPDATE_COMMENT_REQUEST: null,
    GET_COMMENTS_REQUEST: null,
    DELETE_COMMENT_REQUEST: null,
    CREATE_COMMENT_RESPONSE: null,
    UPDATE_COMMENT_RESPONSE: null,
    GET_COMMENTS_RESPONSE: null,
    DELETE_COMMENT_RESPONSE: null,

    // Invitaitons
    CREATE_INVITATION_REQUEST: null,
    CREATE_INVITATION_RESPONSE: null,
    GET_INVITATION_REQUEST: null,
    GET_INVITATION_RESPONSE: null,

    // Feedback
    CREATE_FEEDBACK_REQUEST: null,
    CREATE_FEEDBACK_SUCCESS_RESPONSE: null,
    CREATE_FEEDBACK_ERROR_RESPONSE: null,

    // Page Title
    SET_PAGE_TITLE: null,

    // Toast
    TOAST_MESSAGE: null,
    TOAST_ERROR: null,
    CLOSE_TOAST: null,

    // Modal
    OPEN_MODAL: null,
    CLOSE_MODAL: null,

    // Error Statuses
    UNAUTHORIZED_REQUEST: null,
    SERVER_500_ERROR: null,

    // Error
    RESET: null,

    // Routes
    REDIRECT: null
  })
};

export default AppConstants;

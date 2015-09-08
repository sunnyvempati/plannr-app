import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ServerActions {
  static receiveLogin(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveSignup(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SIGNUP_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveVerify(error) {
    AppDispatcher.handleAction({
      type: ActionTypes.VERIFY_RESPONSE,
      error: error
    });
  }

  static receiveResendVerify(json, errors) {
    let type = !errors ? ActionTypes.RESEND_VERIFY_SUCCESS_RESPONSE :
                         ActionTypes.RESEND_VERIFY_ERROR_RESPONSE;
    let entity = json;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveResetRequest(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveResetPassword(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveLogout(errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGOUT_RESPONSE,
      errors: errors
    })
  }

  static receiveProfile(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.PROFILE_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveUser(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_USER_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveEvents(events, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENTS_RESPONSE,
      events: events,
      params: params,
      errors: errors
    })
  }

  static receiveEventSearch(events, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENTS_RESPONSE,
      events: events,
      errors: errors
    })
  }

  static receiveContactSearch(contacts, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_CONTACTS_RESPONSE,
      contacts: contacts,
      errors: errors
    });
  }

  static receiveCreateContact(json, errors) {
    let type = !errors ? ActionTypes.CREATE_CONTACT_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_CONTACT_ERROR_RESPONSE;
    let entity = json && json.contact;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveGetContact(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveGetVendor(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDOR_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveCreateEvent(json, errors) {
    let type = !errors ? ActionTypes.CREATE_EVENT_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_EVENT_ERROR_RESPONSE;
    let entity = json && json.event;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteEvents(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveUpdateEvent(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_EVENT_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_EVENT_ERROR_RESPONSE;
    let entity = json && json.event;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveTasks(tasks, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_TASKS_RESPONSE,
      tasks: tasks,
      params: params,
      errors: errors
    })
  }

  static receiveUserSearch(users, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_USERS_RESPONSE,
      users: users,
      errors: errors
    })
  }

  static receiveCreateTask(json, errors) {
    let type = !errors ? ActionTypes.CREATE_TASK_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_TASK_ERROR_RESPONSE;
    let entity = json && json.task;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveEvent(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateTask(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_TASK_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_TASK_ERROR_RESPONSE;
    let entity = json && json.task;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveUpdateContact(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_CONTACT_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_CONTACT_ERROR_RESPONSE;
    let entity = json && json.contact;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveUpdateUser(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_USER_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateVendor(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_VENDOR_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_VENDOR_ERROR_RESPONSE;
    let entity = json && json.vendor;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteTasks(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_TASK_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveGetContacts(contacts, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACTS_RESPONSE,
      contacts: contacts,
      params: params,
      errors: errors
    })
  }

  static receiveGetUsers(users, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_USERS_RESPONSE,
      users: users,
      params: params,
      errors: errors
    })
  }

  static receiveGetEventContacts(eventContacts, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_CONTACTS_RESPONSE,
      eventContacts: eventContacts,
      params: params,
      errors: errors
    })
  }

  static receiveGetVendors(vendors, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDORS_RESPONSE,
      vendors: vendors,
      params: params,
      errors: errors
    })
  }

  static receiveGetEventVendors(eventVendors, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_VENDORS_RESPONSE,
      eventVendors: eventVendors,
      params: params,
      errors: errors
    })
  }

  static receiveVendorSearch(vendors, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_VENDORS_RESPONSE,
      vendors: vendors,
      errors: errors
    });
  }

  static receiveEventVendorSearch(eventVendors, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENT_VENDORS_RESPONSE,
      eventVendors: eventVendors,
      errors: errors
    });
  }

  static receiveCreateVendor(json, errors, autocomplete) {
    let type;
    if (autocomplete) {
      type = !errors ? ActionTypes.CREATE_AUTOCOMPLETE_VENDOR_SUCCESS_RESPONSE :
                       ActionTypes.CREATE_AUTOCOMPLETE_VENDOR_ERROR_RESPONSE;
    } else {
      type = !errors ? ActionTypes.CREATE_VENDOR_SUCCESS_RESPONSE :
                       ActionTypes.CREATE_VENDOR_ERROR_RESPONSE;
    }
    let entity = json && json.vendor;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteContacts(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_USERS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveDeleteUsers(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_USERS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveDeleteVendors(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_VENDORS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveCreateEventContact(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_CONTACT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveCreateEventVendor(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_VENDOR_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveDeleteEventContacts(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_CONTACTS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveDeleteEventVendors(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_VENDORS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveComments(comments, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_COMMENTS_RESPONSE,
      comments: comments,
      params: params,
      errors: errors
    })
  }

  static receiveUpdateComment(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_COMMENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveDeleteComment(id, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_COMMENT_RESPONSE,
      id: id,
      params: params,
      errors: errors
    });
  }

  static receiveCreateComment(json, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_COMMENT_RESPONSE,
      json: json,
      params: params,
      errors: errors
    });
  }

  static receiveCreateEventAttachment(json, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_ATTACHMENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveGetAttachments(attachments, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_ATTACHMENTS_RESPONSE,
      attachments: attachments,
      params: params,
      errors: errors
    });
  }

  static receiveDeleteAttachments(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_ATTACHMENTS_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveInviteUser() {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_INVITATION_RESPONSE
    });
  }

  static receiveInvitation(json, error) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_INVITATION_RESPONSE,
      json: json,
      error: error
    });
  }

  static receiveCreateFeedback(json, errors) {
    let type = !errors ? ActionTypes.CREATE_FEEDBACK_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_FEEDBACK_ERROR_RESPONSE;
    let entity = json && json.feedback;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveExpenses(expenses, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSES_RESPONSE,
      expenses: expenses,
      params: params,
      errors: errors
    })
  }

  static receiveGetExpenseCategories(expenseCategories, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_EXPENSE_CATEGORIES_RESPONSE,
      expenseCategories: expenseCategories,
      params: params,
      errors: errors
    });
  }

  static receiveExpenseCategoriesSearch(expenseCategories, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EXPENSE_CATEGORIES_RESPONSE,
      expenseCategories: expenseCategories,
      errors: errors
    })
  }

  static receiveGetExpenseCategory(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSE_CATEGORY_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveCreateExpenseCategory(json, errors) {
    let type = !errors ? ActionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_EXPENSE_CATEGORY_ERROR_RESPONSE;
    let entity = json && json.expense_category;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveCreateEventExpenseCategory(json, errors) {
    let type = !errors ? ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_ERROR_RESPONSE;
    let entity = json && json.event_expense_category;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteEventExpenseCategory(id, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_EXPENSE_CATEGORY_RESPONSE,
      id: id,
      errors: errors
    });
  }

  static receiveGetEventExpenseCategory(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_EXPENSE_CATEGORY_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateEventExpenseCategory(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE;
    let entity = json && json.event_expense_category;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveCreateExpense(json, errors) {
    let type = !errors ? ActionTypes.CREATE_EXPENSE_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_EXPENSE_ERROR_RESPONSE;
    let entity = json && json.expense;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveGetExpense(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EXPENSE_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateExpense(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_EXPENSE_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_EXPENSE_SUCCESS_RESPONSE;
    let entity = json && json.expense;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteExpense(id, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EXPENSE_RESPONSE,
      id: id,
      errors: errors
    });
  }

  static receiveSearchEventExpenseCategories(eventExpenseCategories, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENT_EXPENSE_CATEGORIES_RESPONSE,
      eventExpenseCategories: eventExpenseCategories,
      errors: errors
    })
  }

  static receiveGetEventVendor(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_VENDOR_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveCreatePayment(expenseId, json, errors) {
    let type = !errors ? ActionTypes.CREATE_PAYMENT_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_PAYMENT_ERROR_RESPONSE;
    let entity = json && json.payment;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      expenseId: expenseId,
      errors: errors
    });
  }

  static receiveUpdatePayment(expenseId, json, errors) {
    let type = !errors ? ActionTypes.UPDATE_PAYMENT_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_PAYMENT_ERROR_RESPONSE;
    let entity = json && json.payment;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      expenseId: expenseId,
      errors: errors
    });
  }

  static receiveDeletePayment(expenseId, id, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_PAYMENT_RESPONSE,
      id: id,
      expenseId: expenseId,
      errors: errors
    });
  }
};

export default ServerActions;

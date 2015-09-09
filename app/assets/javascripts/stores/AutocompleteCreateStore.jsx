import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import ContactStore from './ContactStore';
import VendorStore from './VendorStore';
import ExpenseCategoryStore from './ExpenseCategoryStore';

class FormStore extends BaseStore {
  constructor() {
    super();
    this._errors = null;
    this._entity = null;
  }

  get errors() { return this._errors; }
  get entity() { return this._entity; }
  set errors(val) { this._errors = val; }
  set entity(val) { this._entity = val; }

  clear() { this._errors = null; this._entity = null; }
}

let _autocompleteStoreInstance = new FormStore();

_autocompleteStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken,
    ContactStore.dispatchToken,
    VendorStore.dispatchToken,
    ExpenseCategoryStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_AUTOCOMPLETE_VENDOR_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_AUTOCOMPLETE_CONTACT_SUCCESS_RESPONSE:
      _autocompleteStoreInstance.entity = action.entity;
      _autocompleteStoreInstance.errors = null;
      _autocompleteStoreInstance.emitChange();
      break;
    case ActionTypes.CREATE_EXPENSE_CATEGORY_ERROR_RESPONSE:
    case ActionTypes.CREATE_AUTOCOMPLETE_VENDOR_ERROR_RESPONSE:
    case ActionTypes.CREATE_AUTOCOMPLETE_CONTACT_ERROR_RESPONSE:
      _autocompleteStoreInstance.entity = null;
      _autocompleteStoreInstance.errors = action.errors;
      _autocompleteStoreInstance.emitChange();
    case ActionTypes.RESET:
      _autocompleteStoreInstance.clear();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _autocompleteStoreInstance.clear();
      break;
    default:
  }
});

export default _autocompleteStoreInstance;

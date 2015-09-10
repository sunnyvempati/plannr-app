import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {AdminActions} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class AdminStore extends BaseStore {
  constructor() {
    super();
    this._companyInfos = [];
    this._userInfos = [];
  }

  set companyInfos(companyInfos) {
    this._companyInfos = companyInfos;
  }

  get companyInfos() {
    return this._companyInfos;
  }

  set userInfos(userInfos) {
    this._userInfos = userInfos;
  }

  get userInfos() {
    return this._userInfos;
  }
}

let _adminStoreInstance = new AdminStore();

_adminStoreInstance.dispatchToken = AppDispatcher.register((payload) =>{
  let action = payload.action;
  switch(action.type) {
  case AdminActions.FETCH_USER_INFOS_RESPONSE:
    let users = action.json.users;
    _adminStoreInstance.userInfos = users;
    _adminStoreInstance.emitChange();
    break;
  case AdminActions.FETCH_COMPANY_INFOS_RESPONSE:
    let companies = action.json.companies;
    _adminStoreInstance.companyInfos = companies;
    _adminStoreInstance.emitChange();
    break;
  }
});

export default _adminStoreInstance;

import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {AdminActions} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';

class AdminStore extends BaseStore {
  constructor() {
    super();
    this._companyInfos = [];
    this._userInfos = [];
  }

  get companyInfos() {
    return this._companyInfos;
  }

  get userInfos() {
    return this._userInfos;
  }
}

let _adminStoreInstance = new AdminStore();

_adminStoreInstance.dispatchToken = AppDispatcher.register((payload) =>{
  let action = payload.action;

  switch(action.type) {

  }
});

export default _adminStoreInstance;

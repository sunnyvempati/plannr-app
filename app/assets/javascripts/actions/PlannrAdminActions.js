import AppDispatcher from '../dispatcher/AppDispatcher';
import {AdminActions} from '../constants/AppConstants';
import AdminService from '../services/PlannrAdminService';

function handle(type, json, errors) {
  AppDispatcher.handleAction({type, json, errors});
}

export default {
  getUserInfos() {
    AdminService.getUsers();
  },
  getCompanyInfos() {
    AdminService.getCompanies();
  },
  receiveUserInfos(json, errors) {
    handle(AdminActions.FETCH_USER_INFOS_RESPONSE, json, errors);
  },
  receiveCompanyInfos(json, errors) {
    handle(AdminActions.FETCH_COMPANY_INFOS_RESPONSE, json, errors);
  }
};

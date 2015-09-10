import request from 'superagent';
import {APIEndpoints} from '../constants/AppConstants';
import {Utils, AuthIntercept} from './Utils';
import AdminActions from '../actions/PlannrAdminActions';

function get(endpoint, callback) {
  request
    .get(endpoint)
    .use(AuthIntercept)
    .end(function(error, res){
      let json = error ? null: JSON.parse(res.text);
      callback(json, error);
    });
}

export default {
  getUsers() {
    get(APIEndpoints.ADMIN_REPORTS_USERS, AdminActions.receiveUserInfos);
  },
  getCompanies() {
    get(APIEndpoints.ADMIN_REPORTS_COMPANIES, AdminActions.receiveCompanyInfos);
  }
};

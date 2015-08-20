import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class UserService {
  static get(id) {
    request
      .get(APIEndpoints.GET_USER + id)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        let json = error ? null : JSON.parse(res.text);
        ServerActions.receiveUser(json, error);
      });
  }

  static search(params) {
    request
      .get(APIEndpoints.GET_USERS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUserSearch(json.users);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUserSearch(null, errors);
          }
        }
      });
  }
}

export default UserService;

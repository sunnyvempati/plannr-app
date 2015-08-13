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
}

export default UserService;

import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';

class ContactService {
  static search(params) {
    request
      .get(APIEndpoints.GET_EVENTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveSearch(json.events);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveSearch(null, errors);
          }
        }
      });
  }
}

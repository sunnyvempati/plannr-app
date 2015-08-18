import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';

class ContactService {
  static search(params) {
    request
      .get(APIEndpoints.GET_CONTACTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveContactSearch(json.contacts);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveContactSearch(null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_CONTACT)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateContact(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateContact(null, errors);
          }
        }
      });
  }

  static getEventClient(id) {
    request
      .get(APIEndpoints.GET_CONTACT + id)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveEventClient(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveEventClient(null, errors);
          }
        }
      });
  }
}

export default ContactService;

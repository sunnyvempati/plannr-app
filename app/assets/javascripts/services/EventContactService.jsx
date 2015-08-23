import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';

class EventContactService {
  static getContacts(params) {
    request
      .get(APIEndpoints.GET_EVENT_CONTACTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            // rails serializer returns json.eventcontacts if none are returned
            let eventContacts = json.event_contacts || [];
            ServerActions.receiveGetEventContacts(eventContacts, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetEventContacts(null, null, errors);
          }
        }
      });
  }
}

export default EventContactService;

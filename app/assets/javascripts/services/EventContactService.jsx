import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';
import ToastActions from '../actions/ToastActions';

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

  static create(eventId, contactId) {
    request
      .post(APIEndpoints.CREATE_EVENT_CONTACT)
      .send({event_contact: {event_id: eventId, contact_id: contactId}})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateEventContact(json);
            let contactName = json.event_contact.contact.name;
            ToastActions.toast(contactName + " has been added to the event!");
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateEventContact(null, errors);
          }
        }
      });
  }

  static remove(ids) {
    request
      .post(APIEndpoints.DELETE_EVENT_CONTACTS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " contact(s) removed from event!") }
        ServerActions.receiveDeleteEventContacts(ids, errors);
      });
  }
}

export default EventContactService;

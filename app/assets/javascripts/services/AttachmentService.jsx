import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import GlobalStore from '../stores/GlobalStore.jsx';
import {APIEndpoints} from '../constants/AppConstants';

class AttachmentService {
  // static getContacts(params) {
  //   request
  //     .get(APIEndpoints.GET_EVENT_CONTACTS)
  //     .query(params)
  //     .set('Accept', 'application/json')
  //     .end((error, res) => {
  //       if (res) {
  //         if (!error) {
  //           let json = JSON.parse(res.text);
  //           // rails serializer returns json.eventcontacts if none are returned
  //           let eventContacts = json.event_contacts || [];
  //           ServerActions.receiveGetEventContacts(eventContacts, params, null);
  //         } else {
  //           let errors = Utils.getErrors(res);
  //           ServerActions.receiveGetEventContacts(null, null, errors);
  //         }
  //       }
  //     });
  // }

  static create(file) {
    request
      .post(APIEndpoints.CREATE_ATTACHMENT)
      .attach(file, file, file)
      .send({authenticity_token: GlobalStore.AuthToken})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        console.log(res);
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
}

export default AttachmentService;

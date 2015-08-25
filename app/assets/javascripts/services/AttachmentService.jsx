import request from 'superagent';
import {Utils, AuthIntercept} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import GlobalStore from '../stores/GlobalStore.jsx';
import {APIEndpoints} from '../constants/AppConstants';

class AttachmentService {
  static getAttachments(params) {
    request
      .get(APIEndpoints.GET_ATTACHMENTS)
      .query(params)
      .set('Accept', 'application/json')
      .use(AuthIntercept)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetAttachments(json.attachments, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetAttachments(null, null, errors);
          }
        }
      });
  }

  static create(formData, eventId) {
    request
      .post(APIEndpoints.CREATE_ATTACHMENT +"?event_id=" + eventId + "&authenticity_token=" + encodeURIComponent(GlobalStore.AuthToken))
      .send(formData)
      .use(AuthIntercept)
      .set('multipart/form-data')
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

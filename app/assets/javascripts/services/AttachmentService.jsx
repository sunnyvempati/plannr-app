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
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateEventAttachment(json);
            let attachmentName = json.attachment.file_name;
            ToastActions.toast(attachmentName + " has been added to the event!");
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateEventAttachment(null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_ATTACHMENTS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " attachment(s) successfully deleted!") }
        ServerActions.receiveDeleteAttachments(ids, errors);
      });
  }
}

export default AttachmentService;

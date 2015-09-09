import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class ContactService {
  static getContacts(params) {
    request
      .get(APIEndpoints.GET_CONTACTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetContacts(json.contacts, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetContacts(null, null, errors);
          }
        }
      });
  }

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

  static create(params, autocomplete) {
    request
      .post(APIEndpoints.CREATE_CONTACT)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          let json = null, errors = null;
          if (!error) {
            json = JSON.parse(res.text);
          } else {
            errors = Utils.getErrors(res);
          }
          ServerActions.receiveCreateContact(json, errors, autocomplete);
        }
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_CONTACT + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateContact(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateContact(null, errors);
          }
        }
      });
  }

  static get(id) {
    request
      .get(APIEndpoints.GET_CONTACT + id)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetContact(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetContact(null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_CONTACTS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " contact(s) successfully deleted!") }
        ServerActions.receiveDeleteContacts(ids, errors);
      });
  }
}

export default ContactService;

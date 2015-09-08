import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class VendorService {
  static getVendors(params) {
    request
      .get(APIEndpoints.GET_VENDORS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetVendors(json.vendors, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetVendors(null, null, errors);
          }
        }
      });
  }

  static search(params) {
    request
      .get(APIEndpoints.GET_VENDORS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveVendorSearch(json.vendors);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveVendorSearch(null, errors);
          }
        }
      });
  }

  static create(params, autocomplete) {
    request
      .post(APIEndpoints.CREATE_VENDOR)
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
          ServerActions.receiveCreateVendor(json, errors, autocomplete);
        }
      });
  }

  static get(id) {
    request
      .get(APIEndpoints.GET_VENDOR + id)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveGetVendor(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetVendor(null, errors);
          }
        }
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_VENDOR + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateVendor(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateVendor(null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_VENDORS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " vendor(s) successfully deleted!") }
        ServerActions.receiveDeleteVendors(ids, errors);
      });
  }
}

export default VendorService;

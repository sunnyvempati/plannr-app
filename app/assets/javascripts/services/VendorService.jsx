import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
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

  static create(params) {
    request
      .post(APIEndpoints.CREATE_VENDOR)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateVendor(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateVendor(null, errors);
          }
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
}

export default VendorService;

import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';
import ToastActions from '../actions/ToastActions';

class EventVendorService {
  static getVendors(params) {
    request
      .get(APIEndpoints.GET_EVENT_VENDORS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            let eventVendors = json.event_vendors || [];
            ServerActions.receiveGetEventVendors(eventVendors, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveGetEventVendors(null, null, errors);
          }
        }
      });
  }

  static create(eventId, vendorId) {
    request
      .post(APIEndpoints.CREATE_EVENT_VENDOR)
      .send({event_vendor: {event_id: eventId, vendor_id: vendorId}})
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateEventVendor(json);
            let vendorName = json.event_vendor.vendor.name;
            ToastActions.toast(vendorName + " has been added to the event!");
            // ToastActions.toast("New task created successfully!");
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateEventVendor(null, errors);
          }
        }
      });
  }

  static remove(ids) {
    request
      .post(APIEndpoints.DELETE_EVENT_VENDORS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast(ids.length + " vendor(s) removed from event!") }
        ServerActions.receiveDeleteEventVendors(ids, errors);
      });
  }
}

export default EventVendorService;

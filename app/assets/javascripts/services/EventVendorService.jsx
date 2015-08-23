import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import {APIEndpoints} from '../constants/AppConstants';

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
}

export default EventVendorService;

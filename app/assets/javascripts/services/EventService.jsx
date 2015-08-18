import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class EventService {
  static getEvents(params) {
    request
      .get(APIEndpoints.GET_EVENTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveEvents(json.events, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveEvents(null, null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_EVENTS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        ServerActions.receiveDeleteEvents(ids, errors);
      });
  }

  static search(params) {
    request
      .get(APIEndpoints.GET_EVENTS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveEventSearch(json.events);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveEventSearch(null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_EVENT)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateEvent(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateEvent(null, errors);
          }
        }
      });
  }
}

export default EventService

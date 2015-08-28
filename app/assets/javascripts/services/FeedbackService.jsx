import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class FeedbackService {
  static create(params) {
    request
      .post(APIEndpoints.FEEDBACK)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateFeedback(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateFeedback(null, errors);
          }
        }
      });
  }
}

export default FeedbackService;

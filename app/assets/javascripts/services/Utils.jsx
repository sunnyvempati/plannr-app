import GlobalStore from '../stores/GlobalStore.jsx';
import Intercept from 'superagent-intercept';
import Router from 'react-router';

export class Utils {
  static addAuthToken(request) {
    request.send({authenticity_token: GlobalStore.AuthToken});
  }

  static getErrors(res) {
    return JSON.parse(res.text);
  }
}

export let AuthIntercept = Intercept((err, res) => {
  if (res.status == 401) router.transitionTo('login');
});

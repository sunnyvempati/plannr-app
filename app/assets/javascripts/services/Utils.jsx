import GlobalStore from '../stores/GlobalStore.jsx';

class Utils {
  static addAuthToken(request) {
    request.send({authenticity_token: GlobalStore.AuthToken});
  }

  static getErrors(res) {
    return JSON.parse(res.text);
  }
}

export default Utils;

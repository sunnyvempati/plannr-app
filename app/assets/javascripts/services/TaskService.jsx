import request from 'superagent';
import {Utils} from './Utils';
import ServerActions from '../actions/ServerActions';
import ToastActions from '../actions/ToastActions';
import {APIEndpoints} from '../constants/AppConstants';

class TaskService {
  static getTasks(params) {
    request
      .get(APIEndpoints.GET_TASKS)
      .query(params)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveTasks(json.tasks, params, null);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveTasks(null, null, errors);
          }
        }
      });
  }

  static create(params) {
    request
      .post(APIEndpoints.CREATE_TASK)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveCreateTask(json);
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateTask(null, errors);
          }
        }
      });
  }
}

export default TaskService;

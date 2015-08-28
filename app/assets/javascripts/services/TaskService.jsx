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
            ToastActions.toast("New task created successfully!");
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveCreateTask(null, errors);
          }
        }
      });
  }

  static update(id, params) {
    request
      .put(APIEndpoints.UPDATE_TASK + id)
      .send(params)
      .use(Utils.addAuthToken)
      .end((error, res) => {
        if (res) {
          if (!error) {
            let json = JSON.parse(res.text);
            ServerActions.receiveUpdateTask(json);
            ToastActions.toast("Task succesfully updated!");
          } else {
            let errors = Utils.getErrors(res);
            ServerActions.receiveUpdateTask(null, errors);
          }
        }
      });
  }

  static delete(ids) {
    request
      .post(APIEndpoints.DELETE_TASKS)
      .send({destroy_opts: {ids: ids}})
      .use(Utils.addAuthToken)
      .set('Accept', 'application/json')
      .end((error, res) => {
        let errors = null;
        if (res && error) errors = Utils.getErrors(res);
        if (!error) { ToastActions.toast("Task successfully deleted!") }
        ServerActions.receiveDeleteTasks(ids, errors);
      });
  }
}

export default TaskService;

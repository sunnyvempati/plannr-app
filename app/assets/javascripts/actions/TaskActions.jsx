import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import TaskService from '../services/TaskService';
import TaskStore from '../stores/TaskStore';

class TaskActions {
  static getTasks(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_TASKS_REQUEST,
      params: params
    });
    TaskService.getTasks(params);
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_TASK_REQUEST,
      params: params
    })
    TaskService.create(params);
  }

  static update(id, params) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_TASK_REQUEST,
      id: id,
      params: params
    });
    TaskService.update(id, params);
  }

  static delete(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_TASK_REQUEST,
      ids: ids
    });
    TaskService.delete(ids);
  }
}

export default TaskActions;

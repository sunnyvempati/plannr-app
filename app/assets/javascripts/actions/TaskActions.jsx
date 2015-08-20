import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import TaskService from '../services/TaskService';
import TaskStore from '../stores/TaskStore';

class TaskActions {
  static getTasks(params) {
    if (TaskStore.isCached(params)) {
      AppDispatcher.handleServerAction({
        type: ActionTypes.GET_CACHED_TASKS_RESPONSE,
        params: params
      })
    } else {
      TaskService.getTasks(params);
    }
  }
}

export default TaskActions;

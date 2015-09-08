import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ViewStore from './ViewStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import extend from 'extend';

class TaskStore extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._tasks = [];
    // used for pagination/sort/filter
    this._view = new ViewStore();
  }

  get tasksLoaded() { return this._view.itemsLoaded; }

  get viewTasks() {
    // this flattens array and sorts keys by page so
    // page 1 is displayed in order
    let viewTaskIds = this._view.viewItems;
    return viewTaskIds.map((id) => this._tasks[id]);
  }

  addTasks(tasks, params) {
    let isSearchQuery = !!params.search_query;
    if (!isSearchQuery) this._cache.createContext(params);
    let page = params.page;
    if (page == 1 && !tasks.length) this._view.reset();
    if (tasks.length > 0) {
      this._view.addPage(page);
      tasks.forEach((task) => {
        // add to global
        this._tasks[task.id] = task;
        this._view.addItemToPage(task.id, page);
        // then add to cache
        if (!isSearchQuery) this._cache.add(task.id, params);
      });
    } else this._view.itemsLoaded = true;
  }

  add(task) {
    this._tasks[task.id] = task;
    this._cache.clear();
  }

  addCachedTasksToView(params) {
    let taskIds = this._cache.getItems(params);
    let page = params.page;
    if (page == 1 && !taskIds.length) this._view.reset();
    if (taskIds && taskIds.length) {
      this._view.addItemsToPage(taskIds, page);
    } else this._view.itemsLoaded = true;
  }

  get(id) {
    return this._tasks[id];
  }

  getFromCache(params) {
    let taskIds = this._cache.getItems(params);
    return taskIds.map((id) => {
      return this._tasks[id];
    });
  }

  clear() {
    this._tasks = [];
    this._cache.clear();
    this._view.reset();
  }

  isCached(params) {
    return !!this._cache.contextExists(params);
  }

  removeTasks(ids) {
    this._cache.clear();
    // remove from global task map
    ids.map((id) => {
      delete this._tasks[id];
    });
    // remove from view
    this._view.remove(ids);
  }
}

let _taskStoreInstance = new TaskStore();

_taskStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_TASKS_RESPONSE:
      if (action.tasks) {
        _taskStoreInstance.addTasks(action.tasks, action.params);
      }
      _taskStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_TASK_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_TASK_SUCCESS_RESPONSE:
      _taskStoreInstance.add(action.entity);
      _taskStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_TASK_RESPONSE:
      if (!action.errors) {
        _taskStoreInstance.removeTasks(action.ids);
        _taskStoreInstance.emitChange();
      }
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _taskStoreInstance.clear();
      break;
    default:
  }
});

export default _taskStoreInstance;

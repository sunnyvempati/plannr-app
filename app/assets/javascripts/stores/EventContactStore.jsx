import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import ContactStore from './ContactStore';

class EventContactStore extends BaseStore {
  constructor() {
    super();
  }
}

let _eventContactStore = new EventContactStore();

_eventContactStore.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    ContactStore.dispatchToken
  ]);

  let action = payload.action;

  switch (action.type) {
    default:
  }
});

export default _eventContactStore;

import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class PageTitleActions {
  static setPageTitle(header, skrollable) {
    AppDispatcher.handleAction({
      type: ActionTypes.SET_PAGE_TITLE,
      skrollable: skrollable,
      header: header
    });
  }
};

export default PageTitleActions;

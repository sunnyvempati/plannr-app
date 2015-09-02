import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class PageTitleActions {
  static setPageTitle(header, pageClass) {
    AppDispatcher.handleAction({
      type: ActionTypes.SET_PAGE_TITLE,
      pageClass: pageClass,
      header: header
    });
  }
};

export default PageTitleActions;

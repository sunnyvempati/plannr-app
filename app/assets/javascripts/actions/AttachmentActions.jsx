import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import AttachmentService from '../services/AttachmentService';

export default class AttachmentActions {
  static getAttachments(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_ATTACHMENTS_REQUEST,
      params: params
    });
    AttachmentService.getAttachments(params);
  }

  static create(formData, eventId) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_ATTACHMENT_REQUEST,
      formData: formData,
      eventId: eventId
    });
    AttachmentService.create(formData, eventId);
  }

  static delete(ids) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_ATTACHMENTS_REQUEST,
      ids: ids
    });
    AttachmentService.delete(ids);
  }
}

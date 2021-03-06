import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import TaskActions from '../../actions/TaskActions';
import ModalActions from '../../actions/ModalActions';
import TaskStore from '../../stores/TaskStore';
import moment from 'moment';
import DatePickerInput from '../generic/DatePickerInput';
import CheckboxInput from '../generic/CheckboxInput';
import TextAreaInput from '../generic/TextAreaInput';
import FormButtonList from '../generic/FormButtonList';
import TaskAssignedToInput from './TaskAssignedToInput';
import TaskEventInput from './TaskEventInput';
import Button from '../generic/Button';
import classNames from 'classnames';

const TaskForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    type: React.PropTypes.oneOf(['NEW', 'OLD']).isRequired,
    model: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      compact: false
    };
  },
  getInitialState: function() {
    return {
      notifyUser: false
    }
  },
  mapInputs: function(inputs) {
    return {
      'task': {
        'name': inputs.name,
        'deadline': inputs.deadline,
        'event_id': inputs.event,
        'assigned_to_id': inputs.assignedTo,
        'description': inputs.description
      }
    };
  },
  onSuccess: function (result) {
    this.props.onSuccess(result, this.createAndNewClicked);
  },
  onSecondaryClick: function() {
    this.props.onSecondaryClick();
  },
  formatDateAndSubmit: function(data, reset, invalidate) {
    data.task.deadline = data.task.deadline && data.task.deadline.format();
    // set event id if it's not set
    let eventId = this.props.model && this.props.model.event_id;
    data.task.notify_user = this.state.notifyUser;
    if (!data.task.event_id && eventId) {
      data.task.event_id = eventId;
    }
    this.props.type == "NEW" ? TaskActions.create(data) : TaskActions.update(this.props.model && this.props.model.id, data);
  },
  notifyUserChanged(checked) {
    this.setState({notifyUser: checked});
  },
  renderButtonList: function() {
    if (this.props.type == "NEW") return this.renderCreateAndNewButtons();
    else return this.renderFormTwoButtons("Update", 'Cancel');
  },
  renderEventInput: function(val, className) {
    if (!val || this.props.type == "OLD") {
      return (
        <TaskEventInput
          name='event'
          value={val}
          id='task_event_id'
          label='Event'
          className={className}
          autocompleteClassName={this.props.compact ? 'CompactAutocomplete' : 'Autocomplete'} />
      );
    }
  },
  renderNotificationOptions() {
    if (this.props.type == "NEW") {
      return (
        <CheckboxInput onChange={this.notifyUserChanged}
                       checked={this.state.notifyUser}
                       name="notifyUser"
                       checkboxDisplay={<div className="TaskModal-checkbox">Notify assigned user</div>}
        />
      );
    }
  },
  render: function() {
    var compact = this.props.compact;
    var task = {};
    if (this.props.model) {
      var model = this.props.model;
      task = {
        name: model.name,
        description: model.description,
        deadline: model.deadline,
        eventId: model.event_id,
        id: model.id,
        assignedTo: model.assigned_to_id,
        description: model.description
      };
    }
    this.putUrl = this.props.model && this.props.model.id && "/tasks/" + this.props.model.id + ".json";
    var id = 'task_form';
    var eventHidden = !task.eventId ? "" : "hidden";

    var className = compact ? 'CompactFormInput' : 'FormInput';
    var formClasses = classNames({
      'FormContainer--leftAligned': true,
      'compact': this.props.compact
    });
    return (
      <div className={formClasses}>
        <Form mapping={this.mapInputs}
              onSubmit={this.formatDateAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id={id}>
          <FormInput
            id='task_name'
            name='name'
            autofocus='autofocus'
            type='text'
            label='Name*'
            value={task.name}
            placeholder='What is the name of your task?'
            className={className}
            required />
          <DatePickerInput
            name="deadline"
            label="Deadline"
            value={ !!task.deadline ? moment(task.deadline) : null }
            placeholder="When's it due?"
            minDate={moment()}
            className={className}
          />
          {this.renderEventInput(task.eventId, className)}
          <TaskAssignedToInput
            name='assignedTo'
            value={task.assignedTo}
            id='task_assigned_to'
            label='Assign to'
            className={className}
            autocompleteClassName={this.props.compact ? 'CompactAutocomplete' : 'Autocomplete'} />
          <TextAreaInput
            name="description"
            form={id}
            value={task.description}
            label="Description"
            disabled={this.props.disableForm}
            placeholder="How would you describe this task?"
            className={className}
          />
          {this.renderNotificationOptions()}
          {this.renderButtonList()}
        </Form>
      </div>
    );
  }
});

export default TaskForm;

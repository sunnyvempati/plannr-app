import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';
import moment from 'moment';
import DatePickerInput from '../generic/DatePickerInput';
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
    type: React.PropTypes.oneOf(['NEW'], ['OLD']).isRequired,
    model: React.PropTypes.object.isRequired,
  },
  getDefaultProps: function() {
    return {
      compact: false
    };
  },
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'task': {
        'name': inputs.name,
        'deadline': inputs.deadline,
        'event_id': (this.props.model && this.props.model.event_id) || inputs.event_id,
        'assigned_to_id': inputs.assignedTo,
        'description': inputs.description
      }
    };
  },
  navigateToTasks: function() {
    location.href = '/tasks';
  },
  onSuccess: function (result) {
    if (this.createAndNewClicked) {
      !!this.props.onSuccess ? this.props.onSuccess(result, true) : location.reload();
    }
    else {
      !!this.props.onSuccess ? this.props.onSuccess(result, false) : this.navigateToTasks();
    }
  },
  onSecondaryClick: function() {
    !!this.props.onSecondaryClick ? this.props.onSecondaryClick() : this.navigateToTasks();
  },
  formatDateAndSubmit: function(data, reset, invalidate) {
    data.task.deadline = data.task.deadline && data.task.deadline.format();
    this.props.type == "NEW" ? TaskActions.create(data) : TaskActions.update(data);
  },
  handleCreateAndNewClick: function() {
    this.createAndNewClicked = true;
  },
  renderButtonList: function() {
    if (this.props.type == "NEW") {
      return (
        <FormButtonList>
          <Button onClick={this.handleSecondaryClick} className="Button--secondary">
            Cancel
          </Button>
          <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
            Create
          </Button>
          <Button onClick={this.handleCreateAndNewClick} type="submit" className="Button--primary" disabled={this.state.disabled}>
            Create and New
          </Button>
        </FormButtonList>
      )
    }
    else {
      return this.renderFormTwoButtons("Update", 'Cancel');
    }
  },
  renderEventInput: function(val, className) {
    if (!val || this.props.type == "OLD") {
      return (
        <TaskEventInput
          name='event_id'
          value={val}
          id='task_event_id'
          label='Event'
          className={className}
          autocompleteClassName={this.props.compact ? 'CompactAutocomplete' : 'Autocomplete'} />
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
          {this.renderButtonList()}
        </Form>
      </div>
    );
  }
});

export default TaskForm;

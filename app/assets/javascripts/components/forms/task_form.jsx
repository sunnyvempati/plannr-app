var TaskForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
    model: React.PropTypes.object.isRequired,
  },
  url: '/tasks.json',
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'task': {
        'name': inputs.name,
        'deadline': inputs.deadline,
        'event_id': inputs.event_id,
        'assigned_to_id': inputs.assigned_to,
        'description': inputs.description
      }
    };
  },
  getInitialState: function() {
    return {
      eventOptions: <option>Loading..</option>
    };
  },
  componentDidMount: function() {
    this.retrieveEventSelectOptionsAsync();
  },
  retrieveEventSelectOptionsAsync: function () {
    $.get('/events.json', function (result) {
      var options = [];
      if (!!result.events) {
        options = $.map(result.events, function (value, index) {
          return (<option key={index} value={value.id}>{value.name}</option>);
        });
      } else {
        options = <option>No Events</option>;
      }
      this.setState({eventOptions: options});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown){
      this.setState({eventOptions: <option>Error!!</option>});
    }.bind(this));
  },
  getDefaultOptionValue: function() {
    var options = this.state.eventOptions;
    if (options.length > 0) {
      return options[0].props.value;
    }
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
    this.props.routeVerb == "POST" ? this.postForm(data, reset, invalidate) : this.putForm(data, reset, invalidate);
  },
  handleCreateAndNewClick: function() {
    this.createAndNewClicked = true;
  },
  renderButtonList: function() {
    var primaryButtonText = this.props.routeVerb == "POST" ? "Create" : "Update";
    if (this.props.routeVerb == "POST") {
      return (
        <FormButtonList>
          <Button onClick={this.handleSecondaryClick} className="Button--secondary" disabled={this.state.loading}>
            Cancel
          </Button>
          <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
            Create
          </Button>
          <Button onClick={this.handleCreateAndNewClick} type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
            Create and New
          </Button>
        </FormButtonList>
      )
    }
    else {
      return this.renderFormTwoButtons('Edit', 'Cancel');
    }
  },
  render: function() {
    var task = {};
    if (this.props.model) {
      var model = this.props.model;
      task = {
        name: model.name,
        description: model.description,
        deadline: model.deadline,
        eventId: model.event_id,
        id: model.id,
        assigned_to: model.assigned_to_id,
        description: model.description
      };
    }
    this.putUrl = this.props.model && this.props.model.id && "/tasks/" + this.props.model.id + ".json";
    var id = 'task_form';
    var eventHidden = !task.eventId ? "" : "hidden";

    return (
      <div className='FormContainer--leftAligned'>
        <Form mapping={this.mapInputs}
              onSubmit={this.formatDateAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
              id={id}>
          <FormInput
            id='task_name'
            name='name'
            autofocus='autofocus'
            type='text'
            label='Name*'
            value={task.name}
            placeholder='What is the name of your task?'
            required />
          <DatePickerInput
            name="deadline"
            label="Deadline"
            value={ !!task.deadline ? moment(task.deadline) : null }
            placeholder="When's it due?"
            minDate={moment()}
          />
          <FormSelectInput
            id='task_event_id'
            name='event_id'
            type={eventHidden}
            label='Event*'
            options={this.state.eventOptions}
            value={task.eventId || this.getDefaultOptionValue()}
            form={'task_form'}
            disabled={this.props.disableForm}
            required />
          <AssignedToInput
            name='assigned_to'
            value={task.assigned_to}
            id='task_assigned_to'
            label='Assign to' />
          <TextAreaInput
            name="description"
            form={id}
            value={task.description}
            label="Description"
            disabled={this.props.disableForm}
            placeholder="How would you describe this task?"
          />
          {this.renderButtonList()}
        </Form>
      </div>
    );
  }
});

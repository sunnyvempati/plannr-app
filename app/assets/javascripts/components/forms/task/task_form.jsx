var TaskForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET'], ['PUT']).isRequired,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    showButtonList: React.PropTypes.bool.isRequired,
    model: React.PropTypes.object.isRequired,

    disableForm: React.PropTypes.bool,
    secondaryButtonHref: React.PropTypes.string
  },
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
  //getDefaultOptionValue: function() {
  //  var options = this.state.eventOptions;
  //  if (options.length > 0) {
  //    return options[0].props.value;
  //  }
  //},
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
    var id = 'task_form';
    var eventHidden = !task.eventId ? "" : "hidden";
    return (
      <div className='FormContainer--leftAligned'>
        <Form url={this.props.action}
              mapping={this.mapInputs}
              onSuccess={this.props.onSuccess}
              routeVerb={this.props.routeVerb}
              authToken={this.props.authToken}
              primaryButtonText={this.props.primaryButtonText}
              secondaryButtonVisible={this.props.secondaryButtonVisible}
              secondaryButtonHref={this.props.secondaryButtonHref}
              showButtonList={this.props.showButtonList}
              id={id}>
          <FormInput
            id='task_name'
            name='name'
            autofocus='autofocus'
            type='text'
            label='Name*'
            value={task.name}
            placeholder='What is the name of your task?'
            disabled={this.props.disableForm}
            required />
          <DatePickerInput
            name="deadline"
            label="Deadline"
            value={ !!task.deadline ? moment(task.deadline) : null }
            placeholder="When's' it due?"
            minDate={moment()}
          />
          <EventFormInputAutocomplete
            name='event_id'
            value={task.eventId}
            id='task_event_id'
            label='Event*'
            disabled={this.props.disableForm}
            required/>
          <AssignedToInput
            name='assigned_to'
            value={task.assigned_to}
            id='task_assigned_to'
            label='Assign to' />
          <TextAreaInput
            name="description"
            form={id}
            value={task.description}
            className="TextAreaInput"
            label="Description"
            disabled={this.props.disableForm}
            placeholder="How would you describe this task?" />
        </Form>
      </div>
    );
  }
});

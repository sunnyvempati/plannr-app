var TaskForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
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
        'description': inputs.description,
        'deadline': inputs.deadline,
        'event_id': inputs.event_id,
        'assigned_to': inputs.assigned_to
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
  render: function() {
    var task = {};
    if (this.props.model) {
      var model = this.props.model;
      task = {
        name: model.name,
        description: model.description,
        deadline: model.deadline,
        eventId: model.event_id,
        id: model.id
      };
    }
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
              id='task_form'>

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
          <FormInput
            id='task_description'
            name='description'
            autofocus='off'
            type='text'
            label='Description'
            value={task.description}
            placeholder='How would you describe this task?'
            disabled={this.props.disableForm} />
          <FormInput
            id='task_deadline'
            name='deadline'
            autofocus='off'
            dateField={true}
            type='text'
            label='deadline'
            value={ task.deadline }
            placeholder='What is the deadline for this task? (MM/DD/YYYY)'
            disabled={this.props.disableForm} />
          <FormSelectInput
            id='task_event_id'
            name='event_id'
            className='SelectInput'
            label='Event*'
            options={this.state.eventOptions}
            value={task.eventId || this.getDefaultOptionValue()}
            form={'task_form'}
            disabled={this.props.disableForm}
            required />
          <FormAutocompleteInput
            name='assigned_to' />

        </Form>
        <a href={this.hrefRoot }>List</a>
        |
        <a href={this.hrefRoot + '/' + task.id + '/edit' }>Edit</a>
        |
        <a href={this.hrefRoot + '/' + task.id  }>Show</a>
      </div>
    );
  }
});

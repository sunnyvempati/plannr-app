var TaskForm = React.createClass({
  hrefRoot: '/tasks',
  mapInputs: function(inputs) {
    return {
      'name': inputs.name,
      'description': inputs.description,
      'deadline': inputs.deadline,
      'event_id': inputs.event_id,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
  },
  getInitialState: function() {
    return {
      eventOptions: [{value: -1, text: "loading..."}]
    };
  },
  componentWillMount: function() {
    this.retrieveEventDdlOptions();
  },
  retrieveEventDdlOptions: function () {
    $.get('/events/ddl', function (result) {
      var options = [];
      if (!!result.events){
        options = $.map(result.events, function (value, index) {
          return {value: value.id, text: value.name};
        });
        options.splice(0,0,{value:-1, text: 'Select...'}); 
      } else {
        options = [{value: -1, text: "No Events Found"}]
      }
      this.setState({eventOptions: options});
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown){
      this.setState({eventOptions: [{value: -1, text: 'error loading events'}]});
    }.bind(this));
  },
  render: function() {
    return (
        <div className='FormContainer--leftAligned'>
          <Form url={this.props.action}
          mapping={this.mapInputs}
          onSuccess={this.changeUrl}
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
              label='name'
              value={this.props.model.name}
              placeholder='What is the name of your task?'
              disabled={this.props.disableForm}
              required/>
            <FormInput  
              id='task_description'
              name='description'
              autofocus='off'
              type='text' label='description'
              value={this.props.model.description}
              placeholder='How would you describe this task?'
              disabled={this.props.disableForm} />
            <FormInput  
              id='task_deadline'
              name='deadline' 
              autofocus='off'
              dateField={true}
              type='text'
              label='deadline'
              value={ Utils.isoDateToUsFormat(this.props.model.deadline) }
              placeholder='What is the deadline for this task? (MM/DD/YYYY)'
              disabled={this.props.disableForm} />

            <SelectInput
              id='task_event_id'
              name='event_id'
              className='SelectInput'
              label='Event*'
              options={this.state.eventOptions}
              value={this.props.model.event_id}
              form={'task_form'}
              disabled={this.props.disableForm}
            />

          </Form>
          <a href={this.hrefRoot }>List</a>
          |
          <a href={this.hrefRoot + '/' + this.props.model.id + '/edit' }>Edit</a>
          |
          <a href={this.hrefRoot + '/' + this.props.model.id  }>Show</a>
        </div>
      );
    } 
});

var AttachmentForm = React.createClass({
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
      'attachment': {
        'file_name': inputs.file_name,
        'file_extension': inputs.file_extension,
        'description': inputs.description,
        'file_attachment': inputs.file_attachment,
        'event_id': inputs.event_id
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
    var attachment = {};
    if (this.props.model) {
      var model = this.props.model;
      attachment = {
        fileName: model.file_name,
        fileExtension: model.file_extension,
        description: model.description,
        fileAttachment: model.file_attachment,
        eventId: model.event_id,
        id: model.id
      };
    }
    var id = 'attachment_form';
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
          <FileInput
            id='attachment_file_attachment'
            name='file_attachment'
            type='text'
            label='file attachment*'
            placeholder='What is the name of your attachment?'
            disabled={this.props.disableForm}
            required />
          <FormInput
            id='attachment_description'
            name='description'
            autofocus='autofocus'
            type='text'
            label='Description'
            value={attachment.description}
            placeholder='What is the description of your attachment?'
            disabled={this.props.disableForm} />
          <FormSelectInput
            id='attachment_event_id'
            name='event_id'
            className='SelectInput'
            label='Event*'
            options={this.state.eventOptions}
            value={attachment.eventId || this.getDefaultOptionValue()}
            form={'attachment_form'}
            disabled={this.props.disableForm}
            required />

        </Form>
      </div>
    );
  }
});

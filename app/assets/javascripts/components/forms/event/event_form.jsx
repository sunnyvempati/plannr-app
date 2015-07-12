var EventForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin, React.addons.PureRenderMixin],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
  },
  url: '/events.json',
  getInitialState: function() {
    return {
      startDate: null
    };
  },
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'event': {
        'name': inputs.name,
        'start_date': inputs.start_date,
        'end_date': inputs.end_date,
        'description': inputs.description,
        'location': inputs.location,
        'client_id': inputs.client,
        'budget': inputs.budget
      }
    };
  },
  onSuccess: function (result) {
    location.href = "/events/" + result.event.id + "/";
  },
  setStartDate: function(date) {
    this.setState({startDate: date});
  },
  onSecondaryClick: function() {
    location.href = "/events";
  },
  formatDateAndSubmit: function(data, reset, invalidate) {
    var formatted_data = data;
    var formatted_start_date = formatted_data.event.start_date.format();
    var formatted_end_date = formatted_data.event.end_date.format();
    formatted_data.event.start_date = formatted_start_date;
    formatted_data.event.end_date = formatted_end_date;
    this.submitForm(formatted_data, reset, invalidate);
  },
  render: function () {
    var primaryButtonText = location.pathname.split('/')[2] == 'new' ? "Create Event" : "Update";
    var id = 'event_form';
    var startDate = this.props.model.start_date ? moment(this.props.model.start_date) : null;
    var endDate = this.props.model.end_date ? moment(this.props.model.end_date) : null;
    return (
      <div className="FormContainer--leftAligned">
        <Form mapping={this.mapInputs}
              onSubmit={this.formatDateAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disabledButton}
              authToken={this.props.authToken}
              id={id}>
          <FormInput
            name="name"
            id="event_name"
            autofocus="autofocus"
            placeholder="Give it a unique name"
            type="text"
            label="Name*"
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <DatePickerInput
            name="start_date"
            label="Start Date"
            value={startDate}
            placeholder="When does it start?"
            onValueSet={this.setStartDate}
            minDate={moment()}
          />
          <DatePickerInput
            name="end_date"
            label="End Date"
            value={endDate}
            placeholder="When does it end?"
            minDate={this.state.startDate}
          />
          <FormInput
            name="location"
            id="event_location"
            type="text"
            label="Location"
            value={this.props.model.location}
            disabled={this.props.disableForm}
            placeholder="Where will it be held?"
          />
          <ClientInput
            name='client'
            value={this.props.model.client_id}
            id='event_client'
            label='Client' />
          <FormInput
            name="budget"
            id="event_budget"
            currencyField={true}
            type="text"
            label="Budget"
            value={this.props.model.budget}
            disabled={this.props.disableForm}
            placeholder="How much will it cost?"
            validationError="Must be a number (no commas)"
          />
          <TextAreaInput
            name="description"
            form={id}
            value={this.props.model.description}
            className="TextAreaInput"
            label="Description"
            placeholder="What else do you need to know?"
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
});

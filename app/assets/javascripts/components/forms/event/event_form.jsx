var EventForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST', 'GET']).isRequired,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    showButtonList: React.PropTypes.bool.isRequired,
    disableForm: React.PropTypes.bool,
    model: React.PropTypes.object,
    secondaryButtonHref: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      startDate: null
    };
  },
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'event':{
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
  changeUrl: function (result) {
    location.href = "/events/" + result.event.id + "/";
  },
  setStartDate: function(date) {
    this.setState({startDate: date});
  },
  componentWillMount: function () {
    // Formsy isNumeric required a number to be true (blank, null, and spaces would return false)
    // this allows spaces and numbers with decimal places
    Formsy.addValidationRule('ifPresentIsNumeric', function (n) {
      if (!!n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      return true;
    });
  },
  render: function () {
    var id = 'event_form';
    var startDate = this.props.model.start_date ? moment(this.props.model.start_date) : null;
    var endDate = this.props.model.end_date ? moment(this.props.model.end_date) : null;
    return (
      <div className="FormContainer--leftAligned">
        <Form
          url={this.props.action}
          mapping={this.mapInputs}
          onSuccess={this.changeUrl}
          authToken={this.props.authToken}
          routeVerb={this.props.routeVerb}
          primaryButtonText={this.props.primaryButtonText}
          secondaryButtonVisible={this.props.secondaryButtonVisible}
          secondaryButtonHref={this.props.secondaryButtonHref}
          showButtonList={this.props.showButtonList}
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
            validations="ifPresentIsNumeric"
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
        </Form>
      </div>
    );
  }
});

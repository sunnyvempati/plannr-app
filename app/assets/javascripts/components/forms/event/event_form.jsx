var EventForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    showButtonList: React.PropTypes.bool.isRequired,

    disableForm: React.PropTypes.bool,
    model: React.PropTypes.object,
    secondaryButtonHref: React.PropTypes.string
  },
  hrefRoot: "/events",
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'event':{
        'name': inputs.name,
        'start_date': inputs.start_date,
        'end_date': inputs.end_date,
        'description': inputs.description,
        'location': inputs.location,
        'client': inputs.client,
        'budget': inputs.budget
      }
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
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
            label="Event name*"
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            name="start_date"
            id="event_start_date"
            dateField={true}
            type="text"
            label="Start Date"
            value={ this.props.model.start_date }
            disabled={this.props.disableForm}
            placeholder="When does it start? (MM/DD/YYYY)"
          />
          <FormInput
            name="end_date"
            id="event_end_date"
            dateField={true}
            type="text"
            label="End Date"
            value={ this.props.model.end_date }
            disabled={this.props.disableForm}
            placeholder="When does it end? (MM/DD/YYYY)"
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
            label="Estimated Budget"
            value={this.props.model.budget}
            disabled={this.props.disableForm}
            placeholder="How much will it cost?"
            validations="ifPresentIsNumeric"
            validationError="Must be a number (no commas)"
          />
          <TextAreaInput
            name="description"
            form={id}
            className="TextAreaInput"
            label="Description"
            placeholder="What else do you need to know?"
          />
        </Form>
      </div>
    );
  }
});

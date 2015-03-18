var EventForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'name': inputs.name,
      'client_name': inputs.client_name,
      'start_date': inputs.start_date,
      'location': inputs.location,
      'budget': inputs.budget
    };
  },
  render: function() {
    var id = 'event_form';
    return (
      <div className="FormContainer--leftAligned">
        <Form url='/events'
              mapping={this.mapInputs}
              onSuccessUrl='/events'
              authToken={this.props.authToken}
              routeVerb={this.props.routeVerb}
              primaryButtonText={this.props.primaryButtonText}
              secondaryButtonVisible={this.props.secondaryButtonVisible}
              secondaryButtonHref={this.props.secondaryButtonHref}
              showButtonList={this.props.showButtonList}
              id={id}>
          <FormInput  name="name"
                      id="event_name"
                      autofocus="autofocus"
                      placeholder="Give it a unique name"
                      type="text" label="Event name*"
                      value={this.props.model.name}
                      disabled={this.props.disableForm}
                      required/>
          <FormInput  name="client_name"
                      id="event_client_name"
                      autofocus="autofocus"
                      placeholder="Who's the event for?"
                      type="text" label="Client*"
                      value={this.props.model.client_name}
                      disabled={this.props.disableForm}
                      required/>
          <FormInput  name="start_date"
                      id="event_start_date"
                      autofocus="autofocus"
                      dateField={true}
                      type="text" label="Start Date*"
                      value={this.props.model.start_date}
                      disabled={this.props.disableForm}
                      placeholder="mm/dd/yyyy"/>
          <FormInput  name="budget"
                      id="event_budget"
                      autofocus="autofocus"
                      placeholder="$0"
                      currencyField={true}
                      type="text" label="Estimated Budget*"
                      value={this.props.model.budget}
                      disabled={this.props.disableForm}
                      validations="isNumeric"
                      validationError="Must be a number"/>
          <TextAreaInput name="notes"
                         form={id}
                         className="TextAreaInput"
                         label="Notes"
                         placeholder="What else do you need to know?" />
        </Form>
      </div>
    );
  }
});

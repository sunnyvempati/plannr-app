var CreateEventForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'name': inputs.name,
      'client_name': inputs.client_name,
      'start_date': inputs.start_date,
      'location': inputs.location,
      'budget': inputs.budget
    };
  },
  getInitialState: function() {
    return {canSubmit: false};
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  changeUrl: function () {
    location.href = '/events';
  },
  componentDidMount: function() {
    $("#start_date").datepicker();
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Formsy.Form url='/events' onSuccess={this.changeUrl} onValid={this.enableButton} onInvalid={this.disableButton}>
          <FormInput type="hidden" name={this.props.authParam} value={this.props.authToken} />
          <FormInput name="name" autofocus="autofocus" placeholder="Name of your event" type="text" label="name" required/>
          <FormInput name="client_name" autofocus="autofocus" placeholder="Who is it for?" type="text" label="client_name" required/>
          <FormInput name="location" autofocus="off" placeholder="Where is it?" type="text" label="location" />
          <FormInput name="budget" autofocus="off" placeholder="What's the budget?" type="text" label="budget" validations="isNumeric" validationError="Has to be a number" />
          <Button type="submit" disabled={!this.state.canSubmit} className="FormSubmitButton">Save</Button>
        </Formsy.Form>
      </div>

    );
  }
});

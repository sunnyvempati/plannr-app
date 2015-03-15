var LoginForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password
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
  changeUrl: function() {
    location.href = '/events';
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Formsy.Form url='/user_session' onSuccess={this.changeUrl} onValid={this.enableButton} onInvalid={this.disableButton}>
          <FormInput type="hidden" name={this.props.authParam} value={this.props.authToken}  />
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" required/>
          <FormInput name="password" type="password" placeholder="password" required/>
          <Button type="submit" disabled={!this.state.canSubmit} className="FormSubmitButton">Login</Button>
        </Formsy.Form>
      </div>
    );
  }
});

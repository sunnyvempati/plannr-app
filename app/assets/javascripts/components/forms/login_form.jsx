var LoginForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'user[email]': inputs.email,
      'user[password]': inputs.password,

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
  serverResponse: function (serverResponse) {
    console.log("safdfs");
  },
  submitted: function(data, resetForm, invalidateForm) {
    console.log(data);
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Formsy.Form url='/users/sign_in' onSuccess={this.serverResponse} onValid={this.enableButton} onInvalid={this.disableButton} acceptCharset="UTF-8" method="POST" onError={this.serverResponse} onSubmit={this.submitted}>
          <FormInput type="hidden" name={this.props.auth_param} value={this.props.auth_token} />
          <FormInput name="email" validations="isEmail,isLength:5" validationError="Invalid email" placeholder="email" required/>
          <FormInput name="password" type="password" placeholder="password" required/>
          <Button type="submit" disabled={!this.state.canSubmit} className="FormSubmitButton">Login</Button>
        </Formsy.Form>
      </div>
    );
  }
});

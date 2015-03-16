var LoginForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password,
      'authenticity_token': inputs.authenticity_token
    };
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/user_session'
              mapping={this.mapInputs}
              onSuccessUrl='/events'
              authToken={this.props.authToken}
              primaryButtonText="Login">
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" required/>
          <FormInput name="password" type="password" placeholder="password" required/>
        </Form>
      </div>
    );
  }
});

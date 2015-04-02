var LoginForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function(res) {
    location.href = res.redirect_path;
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/login'
              mapping={this.mapInputs}
              onSuccess={this.changeUrl}
              authToken={this.props.authToken}
              primaryButtonText="Login"
              showButtonList={true}
              secondaryButtonText="Reset Password"
              secondaryButtonHref="/reset_password_request"
              secondaryButtonVisible={true}
              >
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" label="Email*" required/>
          <FormInput name="password" type="password" placeholder="password" label="Password*" required/>
        </Form>
      </div>
    );
  }
});

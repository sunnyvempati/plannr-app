var PasswordResetForm = React.createClass({
  mapInputs: function(inputs) {
    var token = this.props.reset_token;
    return {
      'password': inputs.password,
      'password_confirmation': inputs.password_confirmation,
      'authenticity_token': inputs.authenticity_token,
      'id': token
    };
  },
  changeUrl: function(res) {
    location.href = res.redirect_to;
  },
  render: function() {
    return (
      <div className="FormContainer">
        <h2>{this.props.email}</h2>
        <Form url='/reset_password'
              mapping={this.mapInputs}
              onSuccess={this.changeUrl}
              authToken={this.props.authToken}
              primaryButtonText="Reset Password"
              showButtonList={true}
              >
          <FormInput name="password" type="password" label="New Password*" required/>
          <FormInput name="password_confirmation" type="password" label="Confirm*" required/>
        </Form>
      </div>
    );
  }
});

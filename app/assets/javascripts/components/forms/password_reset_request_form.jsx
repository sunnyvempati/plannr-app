var PasswordResetRequestForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function(res) {
    location.href = res.redirect_to;
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/reset_password_request'
              mapping={this.mapInputs}
              onSuccess={this.changeUrl}
              authToken={this.props.authToken}
              primaryButtonText="Reset Password"
              showButtonList={true}
              >
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" label="Email*" required/>
        </Form>
      </div>
    );
  }
});

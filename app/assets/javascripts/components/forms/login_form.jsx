var LoginForm = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    disableForm: React.PropTypes.bool
  },
  mapInputs: function (inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function (res) {
    location.href = res.redirect_path;
  },
  render: function () {
    var test = {};
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
              id='login_form'>
          <FormInput name="email"
                     type='text'
                     label="Email*"
                     value={null}
                     required />
          <FormInput name="password"
                     type="password"
                     label="Password*"
                     value={null}
                     required />
        </Form>
      </div>
    );
  }
});

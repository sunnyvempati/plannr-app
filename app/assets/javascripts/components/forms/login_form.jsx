var LoginForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    disableForm: React.PropTypes.bool
  },
  url: '/login',
  mapInputs: function (inputs) {
    return {
      'user_session': {
        'email': inputs.email,
        'password': inputs.password,
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  onSuccess: function(result) {
    location.href = result.redirect_path;
  },
  onSecondaryClick: function() {
    location.href = "/reset_password_request";
  },
  render: function () {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
              id='login_form'>
          <FormInput name="email"
                     type='text'
                     validationError="Invalid Email"
                     validations="isEmail"
                     label="Email*"
                     value={null}
                     required />
          <FormInput name="password"
                     type="password"
                     label="Password*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Login', 'Reset Password')}
        </Form>
      </div>
    );
  }
});

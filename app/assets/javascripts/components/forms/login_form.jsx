var LoginForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    disableForm: React.PropTypes.bool
  },
  url: '/login',
  componentDidMount: function() {
    if (this.props.error) {
      ToastMessages.toastError(this.props.error);
      return;
    }
    if (this.props.notice) {
      ToastMessages.toast(this.props.notice);
      return;
    }
  },
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
  onResetPassword: function(e) {
    e.preventDefault();
    location.href = "/reset_password_request";
  },
  onSignUp: function(e) {
    e.preventDefault();
    location.href = "/sign_up";
  },
  renderButtonList: function() {
    return (
      <FormButtonList>
        <Button type="button" onClick={this.onSignUp} className="Button--simple" disabled={this.state.loading}>
          Sign up
        </Button>
        <Button type="button" onClick={this.onResetPassword} className="Button--simple" disabled={this.state.loading}>
          Reset Password
        </Button>
        <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
          Sign in
        </Button>
      </FormButtonList>
    );
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
          {this.renderButtonList()}
        </Form>
      </div>
    );
  }
});

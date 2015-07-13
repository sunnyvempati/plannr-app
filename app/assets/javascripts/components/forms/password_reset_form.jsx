var PasswordResetForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/reset_password',
  mapInputs: function(inputs) {
    var token = this.props.reset_token;
    return {
      'password_reset': {
        'password': inputs.password,
        'password_confirmation': inputs.password_confirmation
      },
      'authenticity_token': inputs.authenticity_token,
      'id': token
    };
  },
  onSuccess: function(res) {
    location.href = res.redirect_to;
  },
  onSecondaryClick: function() {
    location.href = "/login";
  },
  render: function() {
    return (
      <div className="FormContainer">
        <h2>{this.props.email}</h2>
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}>
          <FormInput name="password"
                     type="password"
                     label="New Password*"
                     value={null}
                     required />
          <FormInput name="password_confirmation"
                     type="password"
                     label="Confirm*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Reset Password', 'Cancel')}
        </Form>
      </div>
    );
  }
});

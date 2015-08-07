var PasswordResetRequestForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/reset_password_request',
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'authenticity_token': inputs.authenticity_token
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
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
              id='password_reset_form'>
          <FormInput name="email"
                     label="Email*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Submit Request', 'Go back')}
        </Form>
      </div>
    );
  }
});

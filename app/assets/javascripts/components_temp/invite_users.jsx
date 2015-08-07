var InviteUsers = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/invitations',
  mapInputs: function(inputs) {
    return {
      'invitation': {
        'email': inputs.email
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  onSuccess: function(res) {
    this.refs.inviteEmail.resetValue();
    this.setTimeout(500, ToastMessages.toast("Invite sent successfully."));
  },
  render: function() {
    return (
      <div className="InviteUsersContainer">
        <Form mapping={this.mapInputs}
              authToken={this.props.authToken}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id="InviteUserForm">
          <FormInput name="email"
                     validationError="Invalid Email"
                     validations="isEmail"
                     label="Email*"
                     ref="inviteEmail"
                     value={null} />
          {this.renderFormButton('Invite')}
        </Form>
      </div>
    );
  }
});

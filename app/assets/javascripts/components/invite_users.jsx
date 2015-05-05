var InviteUsers = React.createClass({
  getInitialState: function() {
    return { serverMessage: "" };
  },
  mapInputs: function(inputs) {
    return {
      'invitation': {
        'email': inputs.email
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  setServerMessage: function(message) {
    this.setState({serverMessage: message});
  },
  onSuccess: function(res) {
    this.refs.inviteEmail.resetValue();
    this.setServerMessage("Invite sent successfully");
  },
  render: function() {
    return (
      <div className="InviteUsersContainer">
        <div>
          <Form url='/invitations'
                mapping={this.mapInputs}
                authToken={this.props.authToken}
                onSuccess={this.onSuccess}
                primaryButtonText="Invite"
                id="InviteUserForm">
            <FormInput name="email" validations="isEmail" validationError="Invalid email" label="Email*"  ref="inviteEmail" />
          </Form>
        </div>
        <span>{this.state.serverMessage}</span>
      </div>
    );
  }
});

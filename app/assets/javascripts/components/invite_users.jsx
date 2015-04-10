var InviteUsers = React.createClass({
  getInitialState: function() {
    return { invites: [], serverMessage: "" };
  },
  componentDidMount: function() {
    $.get("/invitations", function(result) {
      this.setState({invites: result.invitations});
    }.bind(this));
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
  getRenderedInvites: function(invites) {
    var rendered_invites = invites.map(function(invite) {
      return (
        <InviteUserRow setServerMessage={this.setServerMessage}
                       invite={invite}
                       admin={this.props.admin}
                       currentUserId={this.props.currentUserId} />
      );
    }, this);
    return rendered_invites;
  },
  onSuccess: function(res) {
    // add the invite, which will re-render the component
    this.refs.invitedEmail.resetValidation();
    this.refs.invitedEmail.resetValue();
    invites = this.state.invites;
    invites.push(res.invitation);
    this.setState({invites: invites});
  },
  render: function() {
    var invites = this.getRenderedInvites(this.state.invites);
    var invite_message = invites.length > 0 ? "" : "No users";
    var cx = React.addons.classSet;
    var inviteUsersFormClasses = cx({
      'InviteUsersContainer-form': true,
      'is-visible': this.props.admin
    });


    return (
      <div className="InviteUsersContainer">
        <span>{this.state.serverMessage}</span>
        <div className={inviteUsersFormClasses}>
          <Form url='/invitations'
                mapping={this.mapInputs}
                authToken={this.props.authToken}
                onSuccess={this.onSuccess}
                primaryButtonText="Invite"
                id="InviteUserForm">
            <FormInput name="email" validations="isEmail" validationError="Invalid email" label="Email*" ref="invitedEmail" />
          </Form>
        </div>
        <div className="InviteUsersContainer-list">
        <h2>All Invites</h2>
          <table className="UserInvitationTable">
            {invites}
            <span>{invite_message}</span>
          </table>
        </div>
      </div>
    );
  }
});

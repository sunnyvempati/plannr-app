var InviteUsers = React.createClass({
  getInitialState: function() {
    return { invites: [] };
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
  invited: function(res) {
    // add the invite, which will re-render the component
    this.refs.invitedEmail.resetValidation();
    this.refs.invitedEmail.resetValue();
    invites = this.state.invites;
    invites.push(res.invitation);
    this.setState({invites: invites});
  },
  render: function() {
    var invites = this.state.invites.map(function(invite) {
      var status = invite.recipient ? "Joined" : "Pending";
      return (
        <tr>
          <td>{invite.email}</td>
          <td>{status.toUpperCase()}</td>
        </tr>
      );
    });
    var invite_message = invites.length > 0 ? "" : "No invites";
    return (
      <div className="InviteUsersContainer">
        <Form url='/invitations'
              mapping={this.mapInputs}
              authToken={this.props.authToken}
              onSuccess={this.invited}
              primaryButtonText="Invite"
              id="InviteUserForm">
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" label="Invite*" ref="invitedEmail" />
        </Form>

        <table className="UserInvitationTable">
          {invites}
          <span>{invite_message}</span>
        </table>
      </div>
    );
  }
});

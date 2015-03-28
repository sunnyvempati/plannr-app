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
        'email': inputs.email,
        'company_id': inputs.company
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  invited: function(res) {
    // add the invite, which will re-render the component
    invites = this.state.invites;
    invites.push(res.invitation);
    this.setState({invites: invites});
  },
  render: function() {
    alert("wtf");
    var invites = this.state.invites.map(function(invite) {
      var status = invite.recipient ? "Joined" : "Pending";
      return (
        <tr>
          <td>{invite.email}</td>
          <td>{status}</td>
          <td>{invite.sender.email}</td>
        </tr>
      );
    });
    var invite_message = invites.length > 0 ? "" : "No invites";
    return (
      <div className="InviteUsers">
        <Form url='/invitations'
              mapping={this.mapInputs}
              authToken={this.props.authToken}
              primaryButtonText="Invite User"
              onSuccess={this.invited}>
          <FormInput type="hidden" name="company" value={this.props.company_id}  />
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" label="Email*" required/>
        </Form>

        <table>
          <tr>
            <th>User Email</th>
            <th>Status</th>
            <th>Invited By</th>
          </tr>
          {invites}
          <span>{invite_message}</span>
        </table>
      </div>
    );
  }
});
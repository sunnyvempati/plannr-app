var InviteUsers = React.createClass({
  getInitialState: function() {
    return { invites: [] };
  },
  componentDidMount: function() {
    $.get("/invitations", function(result) {
      this.setState({invites: result});
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
    console.log(res);
  },
  render: function() {
    var invites = this.state.invites.map(function(invite) {
      return (
        <div>{invite}</div>
      );
    });

    var invite_message = invites.count > 0 ? "" : "No invites";

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
        <span>{invite_message}</span>
        {invites}
      </div>
    );
  }
});
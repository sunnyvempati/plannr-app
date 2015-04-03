var InviteUserRow = React.createClass({
  getInitialState: function() {
    var invite = this.props.invite;
    var recipient_admin = invite.recipient && invite.recipient.company_admin;
    return { recipientAdmin: recipient_admin };
  },
  resendInvite: function() {
    $.post("/resend_invitation",{id: this.props.invite.id}, function(success_result) {
      this.props.setServerMessage(success_result.message);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  toggleAdmin: function() {
    $.post("/toggle_admin",{id: this.props.invite.recipient.id}, function(success_result) {
      this.setState({recipientAdmin: success_result.admin});
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  render: function() {
    var invite = this.props.invite;
    var joined = invite.recipient ? true : false;
    var current_user = invite.recipient && invite.recipient.id == this.props.currentUserId;
    var status = joined ? "Joined" : "Pending";
    var cx = React.addons.classSet;
    var statusClass = cx({
      'UserInvitationTable--is-pending': !invite.recipient
    });
    var resendVisibility = this.props.admin && !joined ? "" : "disabled";
    var adminVisibility = this.props.admin && joined && !current_user ? "" : "disabled";

    var adminText = this.state.recipientAdmin ? "REMOVE ADMIN" : "MAKE ADMIN";

    // this will change once we have designs
    return (
      <tr>
        <td>{invite.email}</td>
        <td>
          <div className={statusClass}>{status.toUpperCase()}</div>
        </td>
        <td className={adminVisibility}>
          <div className="UserInvitationTable-admin" onClick={this.toggleAdmin}>{adminText}</div>
        </td>
        <td className={resendVisibility}>
          <div className="UserInvitationTable-resend" onClick={this.resendInvite}>resend invite</div>
        </td>
      </tr>
    );
  }
});

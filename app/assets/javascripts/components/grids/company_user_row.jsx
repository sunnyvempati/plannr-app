var CompanyUserRow = React.createClass({
  getInitialState: function() {
    return {
      "isAdmin": this.props.data["company_admin"]
    };
  },
  checkboxChanged: function(e) {
    this.props.checkChanged(e);
  },
  toggleAdmin: function() {
    $.post("/toggle_admin",{id: this.props.data["id"]}, function(success_result) {
      this.setState({isAdmin: success_result.admin});
    }.bind(this)).fail(function(error_result) {
      // todo
      // this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  render: function() {
    var adminText = this.state.isAdmin ? "remove" : "make";
    var data = this.props.data;
    return (
      <tr>
        <td>
          <input type="checkbox" onChange={this.checkboxChanged} value={this.props.data["id"]} checked={this.props.checked} />
        </td>
        <td>{data["email"]}</td>
        <td>{data["name"]}</td>
        <td>
          <div className="UserInvitationTable-admin" onClick={this.toggleAdmin}>
            {adminText}
          </div>
        </td>
      </tr>
    );
  }
});

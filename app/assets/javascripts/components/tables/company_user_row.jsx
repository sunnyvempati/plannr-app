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
      <div className="Table-row">
        <div className="Table-rowItem u-flexGrow-1">
          <CheckboxInput onChange={this.checkboxChanged} value={this.props.data["id"]} checked={this.props.checked} />

        </div>
        <div className="Table-rowItem u-flexGrow-3">{data["name"]}</div>
        <div className="Table-rowItem u-flexGrow-4">{data["email"]}</div>
        <div className="Table-rowItem u-flexGrow-2">
          <div className="UserInvitationTable-admin" onClick={this.toggleAdmin}>
            {adminText}
          </div>
        </div>
      </div>
    );
  }
});

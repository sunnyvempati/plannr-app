var CompanyUserRow = React.createClass({
  getInitialState: function() {
    return {
      "isAdmin": this.props.data["company_admin"]
    };
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
    var data = this.props.data;
    return (
      <div className="Table-row">
        <div className="Table-rowItem u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkChanged} value={this.props.data["id"]} checked={this.props.checked} />
        </div>
        <div className="Table-rowItem u-flexGrow-3">{data["name"]}</div>
        <div className="Table-rowItem u-flexGrow-4">{data["email"]}</div>
        <div className="Table-rowItem u-flexGrow-2">
          <ToggleButton checked={this.state.isAdmin} handleClick={this.toggleAdmin} />
        </div>
      </div>
    );
  }
});

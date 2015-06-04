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
  handleActionClick: function(item) {
    item.handler(this.props.data.id);
  },
  getActionTrigger: function() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  getRowActionMenu: function() {
    var globalItems = this.props.actionItems.map(function(item) {
      return (
        <div className="DropdownMenu-item"
             onClick={this.handleActionClick.bind(this, item)}
             key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    return (
      <div className="TableRow-actions">
        {globalItems}
      </div>
    )
  },
  render: function() {
    var data = this.props.data;
    var rowClasses = classNames({
      'Table-row': true,
      'selected': this.props.checked
    });
    return (
      <div className={rowClasses}>
        <div className="Table-checkbox u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkChanged}
                         value={data.id}
                         checked={this.props.checked}
                         hideCheckbox={this.props.hideCheckbox} />
        </div>
        <div className="Table-rowItem u-flexGrow-10">{data.name}</div>
        <div className="Table-rowItem u-flexGrow-6">{data.email}</div>
        <div className="Table-rowItem u-flexGrow-4">
          <ToggleButton checked={this.state.isAdmin} handleClick={this.toggleAdmin} />
        </div>
        <DropdownMenu trigger={this.getActionTrigger()}
                      customOptions={this.getRowActionMenu()}
                      align="right" />
      </div>
    );
  }
});

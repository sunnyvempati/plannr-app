var TableRow = React.createClass({
  handleActionClick: function(item) {
    item.handler(this.props.data.id);
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
  getActionTrigger: function() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  render: function() {
    var rowColumns = this.props.columns.map(function(columnData) {
      var rowClass = "Table-rowItem " + "u-flexGrow-" + columnData.grow;
      return(
        <div className={rowClass} onClick={this.props.onClick} key={columnData.name}>{this.props.data[columnData.name]}</div>
      );
    }, this);
    var rowClasses = classNames({
      'Table-row': true,
      'u-clickable': true,
      'extraPad': this.props.extraPad,
      'selected': this.props.checked
    });
    return (
      <div className={rowClasses}>
        <div className="Table-checkbox u-flexGrow-1">
          <CheckboxInput onChange={this.props.rowChanged}
                         value={this.props.data.id}
                         checked={this.props.checked}
                         hideCheckbox={this.props.hideCheckbox} />
        </div>
        {rowColumns}
        <DropdownMenu trigger={this.getActionTrigger()}
                      customOptions={this.getRowActionMenu()}
                      align="right" />
      </div>
    );
  }
});

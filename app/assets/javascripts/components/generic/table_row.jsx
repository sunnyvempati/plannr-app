var TableRow = React.createClass({
  render: function() {
    var rowColumns = this.props.columns.map(function(columnData) {
      var rowClass = "Table-rowItem " + "u-flexGrow-" + columnData.grow;
      return(
        <div className={rowClass}>{this.props.data[columnData.name]}</div>
      );
    }, this);
    var rowClasses = classNames({
      'Table-row': true,
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
      </div>
    );
  }
});

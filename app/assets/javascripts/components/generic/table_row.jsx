var TableRow = React.createClass({
  render: function() {
    var rowColumns = this.props.columns.map(function(columnData) {
      var rowClass = "Table-rowItem " + "u-flexGrow-" + columnData.grow;
      return(
        <div className={rowClass}>{this.props.data[columnData.name]}</div>
      );
    }, this);
    return (
      <div className="Table-row">
        {rowColumns}
      </div>
    );
  }
});

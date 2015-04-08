var TableRow = React.createClass({
  render: function() {
    var rowColumns = this.props.columns.map(function(columnAttr) {
      return(
        <div className="Table-rowItem">{this.props.data[columnAttr]}</div>
      );
    }, this);
    return (
      <div className="Table-row">
        {rowColumns}
      </div>
    );
  }
});

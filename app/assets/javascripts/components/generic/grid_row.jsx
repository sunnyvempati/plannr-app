var GridRow = React.createClass({
  render: function() {
    var rowColumns = this.props.columns.map(function(columnAttr) {
      return(
        <td className="Grid-rowColumn">{this.props.data[columnAttr]}</td>
      );
    }, this);
    return (
      <tr className="Grid-row">
        {rowColumns}
      </tr>
    );
  }
});

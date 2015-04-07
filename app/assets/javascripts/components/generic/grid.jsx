var Grid = React.createClass({
  gridRows: function() {
    var rows = this.props.results.map(function(result) {
      return(
        <GridRow data={result}
                 columns={this.props.columns} />
      )
    }, this);
    return rows;
  },
  render: function() {
    var gridRows = this.props.useCustomRowComponent ? this.props.customRows : this.gridRows();
    var gridHeaders = this.props.headers.map(function(header_name) {
      return(
        <GridHeader name={header_name} />
      );
    });
    return (
      <div className="GridContainer">
        <div className="GridContainer-actionBtns">
          {this.props.buttonList}
        </div>
        <table className="GridContainer-dataGrid">
            <tbody>{gridHeaders}</tbody>
            {gridRows}
        </table>
      </div>
    );
  }
});

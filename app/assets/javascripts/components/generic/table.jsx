var Table = React.createClass({
  tableRows: function() {
    var rows = this.props.results.map(function(result) {
      return(
        <TableRow data={result}
                  columns={this.props.columns} />
      )
    }, this);
    return rows;
  },
  render: function() {
    var tableRows = this.props.useCustomRowComponent ? this.props.customRows : this.tableRows();
    var tableHeaders = this.props.headers.map(function(header) {
      return(
        <TableHeader data={header} />
      );
    });
    return (
      <div className="TableContainer">
        <h2>{this.props.title}</h2>
        <div className="TableContainer-actionBtns">
          {this.props.buttonList}
        </div>
        <div className="TableContainer-table">
          <div className="Table">
            <div className="Table-row Table-header">
              {tableHeaders}
            </div>
            {tableRows}
          </div>
        </div>
      </div>
    );
  }
});

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
    var noRows = tableRows.length == 0;
    var cx = React.addons.classSet;
    var tableClass = cx({
      'TableContainer': true,
      'is-hidden': noRows
    });
    var message = noRows ? "No company users" : "";
    return (
      <div>
        <span><h2>{message}</h2></span>
        <div className={tableClass}>
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
      </div>
    );
  }
});

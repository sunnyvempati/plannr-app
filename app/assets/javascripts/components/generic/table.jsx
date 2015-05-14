var Table = React.createClass({
  getDefaultProps: function() {
    return {
      showHeaders: true
    };
  },
  tableRows: function() {
    var rows = this.props.results.map(function(result) {
      return(
        <TableRow data={result}
                  columns={this.props.columns}
                  headers={this.props.headers} />
      )
    }, this);
    return rows;
  },
  tableHeaders: function() {
    var show = this.props.showHeaders;
    var tableHeaders = show ? this.props.columns.map(function(column) {
      return(
        <TableHeader name={column.header} grow={column.grow} />
      );
    }) : "";
    var headerClasses = classNames({
      'Table-row': true,
      'Table-header': true,
      'u-hidden': !show
    });
    return (
      <div className={headerClasses}>
        {tableHeaders}
      </div>
    )
  },
  render: function() {
    var tableRows = this.props.useCustomRowComponent ? this.props.customRows : this.tableRows();
    var noRows = tableRows.length == 0;
    var tableClass = classNames({
      'TableContainer': true,
      'u-hidden': noRows
    });
    var message = noRows ? "No items" : "";
    return (
      <div>
        <span>{message}</span>
        <div className={tableClass}>
          <div className="TableContainer-actionBtns">
            {this.props.buttonList}
          </div>
          <div className="TableContainer-table">
            <div className="Table">
              {this.tableHeaders()}
              {tableRows}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Table = React.createClass({
  getDefaultProps: function() {
    return {
      showHeaders: true
    };
  },
  getRows: function() {
    var rows = this.props.results.map(function(result) {
      return(
        <TableRow data={result}
                  columns={this.props.columns}
                  headers={this.props.headers} />
      )
    }, this);
    return rows;
  },
  actionMenu: function() {
    if (this.props.showActions) {
      return (
        <TableAction items={this.props.actionItems} />
      );
    }
  },
  render: function() {
    var tableRows = this.props.useCustomRowComponent ? this.props.customRows : this.getRows();
    var noRows = tableRows.length == 0;
    var message = noRows ? "No items" : "";
    var padClass = this.props.extraPadding ? "extraPad" : "";
    var actionClass = this.props.showActions ? "" : "u-hidden";
    return (
      <div className="TableContainer">
        <div className={"Table-toolbar " + padClass}>
          <div className={"Toolbar-actions " + actionClass}>
            {this.actionMenu()}
          </div>
          <div className="Toolbar-search">
            <i className="fa fa-search tableIcon"></i>
            <input placeholder="Search events.."
                   className="SearchInput"
                   onChange={this.props.handleSearch} />
          </div>
          <div className="Toolbar-sort">
            <TableSort items={this.props.sortItems}
                       handleSortClick={this.props.handleSortClick} />
          </div>
        </div>
        <div className="Table-data">
          {tableRows}
        </div>
      </div>
    );
  }
});

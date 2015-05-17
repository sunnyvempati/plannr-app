var Table = React.createClass({
  getDefaultProps: function() {
    return {
      showHeaders: true
    };
  },
  handleRowClick: function(data) {
    this.props.onClick(data);
  },
  getRows: function() {
    var hideCheckbox = this.props.checkedItems.length > 0 ? false : true;
    var rows = this.props.results.map(function(result) {
      var checked = this.props.checkedItems.indexOf(result.id) > -1;
      return(
        <TableRow data={result}
                  columns={this.props.columns}
                  rowChanged={this.props.rowChanged}
                  checked={checked}
                  hideCheckbox={hideCheckbox}
                  extraPad={this.props.extraPadding}
                  key={result.id}
                  onClick={this.handleRowClick.bind(this, result)} />
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
    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
    return (
      <div className="TableContainer">
        <div className={"Table-toolbar " + padClass}>
          <div className={"Toolbar-actions " + actionClass}>
            {this.actionMenu()}
          </div>
          <div className="Toolbar-search">
            <i className="fa fa-search tableIcon"></i>
            <input placeholder={this.props.searchPlaceholder}
                   className="SearchInput"
                   onChange={this.props.handleSearch} />
          </div>
          <div className="Toolbar-sort">
            <TableSort items={this.props.sortItems}
                       handleSortClick={this.props.handleSortClick} />
          </div>
        </div>
        <div className="Table-data">
          <ReactCSSTransitionGroup transitionName="Table-row">
            {tableRows}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
});

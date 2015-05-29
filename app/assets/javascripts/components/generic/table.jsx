var Table = React.createClass({
  getDefaultProps: function() {
    return {
      showToolbar: true,
      extraPadding: false
    };
  },
  handleRowClick: function(data) {
    this.props.onClick(data);
  },
  getRows: function() {
    var hideCheckbox = this.props.checkedItems.length > 0 ? false : true;
    var rows = this.props.results.map(function(result) {
      var checked = this.props.checkedItems.indexOf(result.id) > -1;
      return (
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
  renderToolbar: function() {
    var actionClasses = classNames({
      'Toolbar-actions': true,
      'u-hidden': !this.props.showActions
    })
    var toolbarClasses = classNames({
      'Table-toolbar': true,
      'extraPad': this.props.extraPadding
    });
    return (
      <div className={toolbarClasses}>
        <div className={actionClasses}>
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
    );
  },
  render: function() {
    var tableRows = this.props.useCustomRowComponent ? this.props.customRows : this.getRows();
    var message = tableRows.length == 0 ? "No items" : "";
    var renderedToolbar = this.props.showToolbar ? this.renderToolbar() : null;
    return (
      <div className="TableContainer">
        {renderedToolbar}
        <div className="Table-data">
          {tableRows}
        </div>
      </div>
    );
  }
});

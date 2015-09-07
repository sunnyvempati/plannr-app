import TableRow from './TableRow';
import TableAction from './TableAction';
import TableFilter from './TableFilter';
import TableSort from './TableSort';
import classNames from 'classnames';
import CheckboxInput from './CheckboxInput';

var Table = React.createClass({
  getDefaultProps: function() {
    return {
      showToolbar: true,
      extraPadding: false,
      filterable: false,
      invertToolbarColors: true, // make all icons white for darker background; default is black
      hideHeaderCheckbox: false
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
                  onClick={this.handleRowClick.bind(this, result)}
                  actionItems={this.props.actionItems} />
      )
    }, this);
    return rows;
  },
  actionMenu: function(invert) {
    if (this.props.showActions) {
      return (
        <TableAction items={this.props.actionItems} invertColor={invert} />
      );
    }
  },
  filterMenu: function(invert) {
    if (this.props.filterable) {
      return (
        <TableFilter items={this.props.filterItems} invertColor={invert} />
      );
    }
  },
  renderToolbar: function() {
    let invert = this.props.invertToolbarColors;
    let tableIconClass = invert ? "tableIcon invert" : "tableIcon";
    let searchClass = classNames({
      'SearchInput': true,
      'invert': invert
    });
    var actionClasses = classNames({
      'Toolbar-actions': true,
      'u-hidden': !this.props.showActions
    });
    var toolbarClasses = {
      'Table-toolbar': true,
      'extraPad': this.props.extraPadding
    };
    let tableActionClass = this.props.tableActionClass;
    if (tableActionClass) toolbarClasses[tableActionClass] = true;
    var filterClasses = classNames({
      'Toolbar-filter': true,
      'u-hidden': !this.props.filterable
    });
    return (
      <div className={classNames(toolbarClasses)}>
        <div className="Toolbar-items">
          <div className={actionClasses}>
            {this.actionMenu(invert)}
          </div>
          <div className="Toolbar-search">
            <i className={"fa fa-search " + tableIconClass}></i>
            <input placeholder={this.props.searchPlaceholder}
                   className={searchClass}
                   onChange={this.props.handleSearch} />
          </div>
          <div className="Toolbar-sort">
            <TableSort items={this.props.sortItems}
                       handleSortClick={this.props.handleSortClick}
                       invertColor={invert} />
          </div>
          <div className={filterClasses}>
            {this.filterMenu(invert)}
          </div>
        </div>
        <div className="Toolbar-actionButton">
          {this.props.actionButton}
        </div>
      </div>
    );
  },
  handleCheckAllChanged: function(checked) {
    this.props.handleCheckAllChanged(checked, this.props.results);
  },
  checkAllInput: function() {
    if (!!this.props.checkedItems) {
      return (
        <CheckboxInput
          onChange={this.handleCheckAllChanged}
          checked={this.props.checkedItems.length == this.props.results.length && this.props.results.length > 0} />
      );
    }
  },
  renderHeaderCheckbox() {
    if (!this.props.hideHeaderCheckbox) {
      return (
        <div className="Table-checkbox u-flexGrow-1">
          {this.checkAllInput()}
        </div>
      )
    }
  },
  getHeaders: function() {
    var headers = this.props.columns.map(function(column) {
      var rowClass = "Table-rowItem u-wrapWithEllipsis " + "u-flexGrow-" + column.grow;
      return (
        <div className={rowClass} key={column.header}>{column.header}</div>
      )
    });
    return (
      <div className="Table-header">
        {this.renderHeaderCheckbox()}
        {headers}
        <div className="Table-action"></div>
      </div>
    );
  },
  render: function() {
    var tableRows = this.props.useCustomRowComponent ? this.props.customRows : this.getRows();
    var message = tableRows.length == 0 ? "No items" : "";
    var renderedToolbar = this.props.showToolbar ? this.renderToolbar() : null;
    var tableHeaders = this.props.showHeaders ? this.getHeaders() : null;
    var dataClasses = {
      'Table-data': true,
      'extraPad': this.props.extraPadding
    };
    dataClasses[this.props.tableDataClassName] = !!this.props.tableDataClassName;
    return (
      <div className="TableContainer">
        {renderedToolbar}
        <div id="tableData" className={classNames(dataClasses)}>
          {tableHeaders}
          {tableRows}
        </div>
      </div>
    );
  }
});

export default Table;

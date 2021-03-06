import classNames from 'classnames';
import DropdownMenu from './DropdownMenu';

var TableSort = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      sortAscending: true,
      activeItem: this.getDefaultItem()
    };
  },
  getDefaultItem: function() {
    return this.props.items.filter(function(item) {
      return item.default;
    })[0];
  },
  handleClick: function(item) {
    // only switch order if active entity is same as
    // clicked entity
    var sameEntity = this.state.activeItem.entity == item.entity;
    var ascending = !sameEntity || (sameEntity && !this.state.sortAscending)
    this.setState({sortAscending: ascending, activeItem: item});
    var order = ascending ? "asc" : "desc";
    this.props.handleSortClick(item.entity, order);
  },
  sortMenu: function() {
    var active = this.state.activeItem;
    var menuItems = this.props.items.map(function(item) {
      var iconClasses = classNames({
        'TableSortMenu-itemOrder': true,
        'u-hidden': active.entity != item.entity
      });
      return (
        <div className="DropdownMenu-item" onClick={this.handleClick.bind(this, item)} key={item.entity}>
          <div className="TableSortMenu-itemDisplay">
            {item.display}
          </div>
          <div className={iconClasses}>
            <i className="fa fa-check"></i>
          </div>
        </div>
      )
    }.bind(this));
    return (
      <div className="TableSortMenu">
        {menuItems}
      </div>
    );
  },
  getTrigger: function() {
    var sortIconClass = this.state.sortAscending ? "fa-sort-amount-asc" : "fa-sort-amount-desc";
    let orderDisplayClasses = classNames({
      'TableSort-orderDisplay': true,
      'invert': this.props.invertColor
    });
    let iconClasses = classNames({
      "fa": true,
      "fa-sort-amount-asc": this.state.sortAscending,
      "fa-sort-amount-desc": !this.state.sortAscending,
      "tableIcon": true,
      "invert": this.props.invertColor,
      "u-clickable": true
    });
    return (
      <div className="TableSort-display u-clickable">
        <i className={iconClasses}></i>
        <div className={orderDisplayClasses}>
          by: {this.state.activeItem.display}
        </div>
      </div>
    )
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    customOptions={this.sortMenu()}
                    header="Sort By:" />
    );
  }
});

export default TableSort;

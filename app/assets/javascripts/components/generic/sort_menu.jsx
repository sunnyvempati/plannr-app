var SortMenu = React.createClass({
  propTypes: {
    entities: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      showSortMenu: false,
      sortAscending: true,
      activeEntity: this.props.defaultEntity
    };
  },
  toggleSort: function() {
    this.setState({showSortMenu: !this.state.showSortMenu});
  },
  handleClick: function(entity) {
    // only switch order if active entity is same as
    // clicked entity
    var sameEntity = this.state.activeEntity == entity;
    var ascending = !sameEntity || (sameEntity && !this.state.sortAscending)
    this.setState({showSortMenu: false, sortAscending: ascending, activeEntity: entity});
    var order = ascending ? "asc" : "desc";
    this.props.sort(entity, order);
  },
  sortMenu: function() {
    var active = this.state.activeEntity;
    var orderClass = this.state.sortAscending ? "fa fa-sort-asc" : "fa fa-sort-desc";
    var menuItems = this.props.entities.map(function(item) {
      var cx = React.addons.classSet;
      var iconClasses = cx({
        'SortMenu-order': true,
        'u-hidden': active != item.entity
      });
      return (
        <div className="SortMenu-item" onClick={this.handleClick.bind(this, item.entity)}>
          <div className="SortMenu-itemName">
            {item.display}
          </div>
          <div className={iconClasses}>
            <i className={orderClass}></i>
          </div>
        </div>
      )
    }.bind(this));
    return menuItems;
  },
  render: function() {
    var show = this.state.showSortMenu;
    var cx = React.addons.classSet;
    var sortMenuClasses = cx({
      'SortMenu': true,
      'u-hidden': !show
    });
    return (
      <div className="SortMenuContainer" onClick={this.toggleSort}>
        <i className="fa fa-sort tableIcon u-clickable"></i>
        <div className={sortMenuClasses}>
          <div className="SortMenu-header">Sort By:</div>
          {this.sortMenu()}
        </div>
      </div>
    );
  }
});

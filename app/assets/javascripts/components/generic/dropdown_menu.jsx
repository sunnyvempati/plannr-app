var DropdownMenu = React.createClass({
  getInitialState: function() {
    return {
      active: false
    };
  },
  componentDidMount: function() {
    $(document).on('click', function(event) {
      if (!$(event.target).closest('#ddmenu').length) {
        this.closeMenu();
      }
    }.bind(this));
  },
  closeMenu: function() {
    this.setState({active: false});
  },
  toggleMenu: function() {
    this.setState({active: !this.state.active}, this.setFocus);
  },
  itemClicked: function(item) {
    this.closeMenu();
    item.handler();
  },
  dropdownMenuItems: function() {
    return this.props.items.map(function(item) {
      return (
        <div className="DropDownMenu-item" onClick={this.itemClicked.bind(this, item)}>
          {item.actionName}
        </div>
      )
    }.bind(this));
  },
  render: function() {
    var optionsClasses = classNames({
      'DropdownMenu-options': true,
      'u-hidden': !this.state.active
    });
    return (
      <div className="DropdownMenu" id="ddmenu">
        <div className="DropdownMenu-trigger u-clickable" onClick={this.toggleMenu}>
          {this.props.trigger}
        </div>
        <div className={optionsClasses}>
          {this.dropdownMenuItems()}
        </div>
      </div>
    );
  }
});

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
        <div className="DropdownMenu-item" onClick={item.handler}>
          {item.actionName}
        </div>
      )
    }.bind(this));
  },
  render: function() {
    var optionsClasses = classNames({
      'DropdownMenu-options': true,
      'default': !this.props.customOptions,
      'u-hidden': !this.state.active
    });
    var customDropDownOptions = !!this.props.customOptions ? this.props.customOptions : this.dropdownMenuItems();
    return (
      <div className="DropdownMenu" id="ddmenu">
        <div className="DropdownMenu-trigger u-clickable" onClick={this.toggleMenu}>
          {this.props.trigger}
        </div>
        <div className={optionsClasses} onClick={this.closeMenu}>
          {customDropDownOptions}
        </div>
      </div>
    );
  }
});

var DropdownMenu = React.createClass({
  getDefaultProps: function() {
    return {
      align: "left"  // "left" or "right"
    };
  },
  getInitialState: function() {
    return {
      active: false
    };
  },
  componentDidMount: function() {
    $(document).on('click', function(event) {
      this.closeMenu();
    }.bind(this));
  },
  closeMenu: function() {
    if (this.isMounted()) {
      this.setState({active: false});
    }
  },
  toggleMenu: function() {
    this.setState({active: !this.state.active}, this.setFocus);
  },
  itemClicked: function(item) {
    item.handler();
  },
  dropdownMenuItems: function() {
    return this.props.items.map(function(item) {
      return (
        <div className="DropdownMenu-item" onClick={this.itemClicked.bind(this, item)} key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
  },
  getHeader: function() {
    if (!!this.props.header) {
      return (
        <div className="DropdownMenu-optionsHeader">
          {this.props.header}
        </div>
      )
    }
  },
  render: function() {
    var optionsClasses = classNames({
      'DropdownMenu-options': true,
      'is-leftAligned': this.props.align == "left",
      'is-rightAligned': this.props.align =="right",
      'default': !this.props.customOptions,
      'u-hidden': !this.state.active
    });
    var dropdownOptions = !!this.props.customOptions ? this.props.customOptions : this.dropdownMenuItems();
    return (
      <div className="DropdownMenu" id="ddmenu" ref="ddmenu">
        <div className="DropdownMenu-trigger u-clickable" onClick={this.toggleMenu}>
          {this.props.trigger}
        </div>
        <div className={optionsClasses} onClick={this.closeMenu}>
          {this.getHeader()}
          {dropdownOptions}
        </div>
      </div>
    );
  }
});

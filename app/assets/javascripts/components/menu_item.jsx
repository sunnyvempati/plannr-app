var MenuItem = React.createClass({
  handleClick: function(href) {
    location.href = href;
  },
  render: function() {
    var item = this.props.item;
    var cx = React.addons.classSet;
    var itemClasses = cx({
      'MenuList-item': true,
      'is-selected': this.props.isSelected
    });
    var iconClasses = item.icon_class + " MenuIcon";
    return (
      <div className={itemClasses} onClick={this.handleClick.bind(this, this.props.item.href)}>
        <div className="MenuList-icon">
          <i className={iconClasses} />
        </div>
        <div className="MenuList-text">
          {item.name}
        </div>
      </div>
    );
  }
});

var MenuItem = React.createClass({
  handleClick: function(href) {
    location.href = href;
  },
  render: function() {
    var item = this.props.item;
    var itemClasses = classNames({
      'MenuList-item': true,
      'u-clickable': true,
      'is-selected': this.props.isSelected
    });
    var iconClasses = {
      'MenuList-icon': true,
      'u-dim': this.props.isSelected
    };
    iconClasses[this.props.item.icon_class] = true;
    return (
      <div className={itemClasses} onClick={this.handleClick.bind(this, this.props.item.href)}>
        <i className={classNames(iconClasses)} />
        <div className="MenuList-text">
          {item.name}
        </div>
      </div>
    );
  }
});

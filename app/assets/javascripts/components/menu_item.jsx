var MenuItem = React.createClass({
  handleClick: function(href) {
    location.href = href;
  },
  render: function() {
    var item = this.props.item;
    var cx = React.addons.classSet;
    var item_classes = cx({
      'MenuList-item': true,
      'is-selected': this.props.isSelected
    });
    return (
      <div className={item_classes} onClick={this.handleClick.bind(this, this.props.item.href)}>
        <Icon className={item.icon_class} />
        <div className="MenuList-text">
          {item.name}
        </div>
      </div>
    );
  }
});

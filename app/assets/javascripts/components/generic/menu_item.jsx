var MenuItem = React.createClass({
  render: function() {
    var item = this.props.item;
    var cx = React.addons.classSet;
    var item_classes = cx({
      'MenuItem': true,
      'is-selected': this.props.isSelected
    });
    return (
      <a href={item.href}>
        <div className={item_classes}>
          <i className={item.icon_class + " MenuItemIcon"} />
          {item.name}
        </div>
      </a>
    );
  }
});

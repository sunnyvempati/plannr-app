var MenuContent = React.createClass({
  render: function() {
    var menu_items = [
        {name: "Events", icon_class: "fa fa-tachometer", href: "/", key: '1'},
        {name: "Tasks", icon_class: "fa fa-check", href: "/tasks", key: '2'},
        {name: "Messages", icon_class: "fa fa-comments", href: "/messages", key: '3'},
        {name: "Contacts", icon_class: "fa fa-book", href: "/contacts", key: '4'},
        {name: "Vendors", icon_class: "fa fa-truck", href: "/vendors", key: '5'}
        ];
    var active_path = this.props.active_path;
    var menu_items = menu_items.map(function(menu_item) {
      return (
        <MenuItem key={menu_item.key} item={menu_item} isSelected={menu_item.href == active_path} />
      );
    });
    return (
      <div className="MenuList">{menu_items}</div>
    );
  }
});

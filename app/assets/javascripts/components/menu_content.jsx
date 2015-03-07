var MenuContent = React.createClass({
  render: function() {
    var menu_items = [
        {name: "Events", icon_class: "fa fa-tachometer", href: "/"},
        {name: "Tasks", icon_class: "fa fa-check", href: "/tasks"},
        {name: "Messages", icon_class: "fa fa-comments", href: "/messages"},
        {name: "Contacts", icon_class: "fa fa-book", href: "/contacts"},
        {name: "Vendors", icon_class: "fa fa-truck", href: "/vendors"}
        ];
    var active_path = this.props.active_path;
    var menu_items = menu_items.map(function(menu_item) {
      return (
        <MenuItem item={menu_item} isSelected={menu_item.href == active_path} />
      );
    });
    return (
      <div className="MenuList">{menu_items}</div>
    );
  }
});

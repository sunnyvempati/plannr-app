var Menu = React.createClass({
  render: function() {
    var menu_items = [
        {name: "Events", icon_class: "fa fa-tachometer", href: "/"},
        {name: "Tasks", icon_class: "fa fa-check", href: "/tasks"},
        {name: "Messages", icon_class: "fa fa-comments", href: "/messages"},
        {name: "Contacts", icon_class: "fa fa-book", href: "/contacts"},
        {name: "Vendors", icon_class: "fa fa-truck", href: "/vendors"}
        ];
    return (
      <div className='dashboard-menu'>
        <div className='dashboard-menu-header'>
          {this.props.name}
        </div>
        <MenuContent menu_items={menu_items} path={this.props.path} />
      </div>
    );
  }
});

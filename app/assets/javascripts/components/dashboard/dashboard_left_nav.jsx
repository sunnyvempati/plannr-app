var DashboardLeftNav = React.createClass({
  render: function() {
    var nav_items = [
        {name: "Events", icon_class: "fa fa-tachometer", href: "/"},
        {name: "Tasks", icon_class: "fa fa-check", href: "/tasks"},
        {name: "Messages", icon_class: "fa fa-comments", href: "/messages"},
        {name: "Contacts", icon_class: "fa fa-book", href: "/contacts"},
        {name: "Vendors", icon_class: "fa fa-truck", href: "/vendors"}
        ];
    return (
      <LeftNav nav_items={nav_items} path={this.props.path} />
    );
  }
});
var EventAppTile = React.createClass({
  mixins: [State],
  contextTypes: {
    router: React.PropTypes.func
  },
  navItems: function() {
    return [
      {to: "tileTasksList", iconClass: "fa fa-check"},
      {to: "eventContacts", iconClass: "fa fa-book"},
      {to: "tileVendorsList", iconClass: "fa fa-truck"},
      {to: "tileAttachmentsList", iconClass: "fa fa-paperclip"}
    ]
  },
  renderNavItems: function() {
    var renderedItems = this.navItems().map(function(navItem) {
      return (
        <Link to={navItem.to} className="EventApp-headerIcon">
          <i className={navItem.iconClass}></i>
        </Link>
      )
    }.bind(this));
    return (
      <div className="EventApp-nav">
        <Link to="tileAll" className="EventApp-homeIcon">
          <i className="fa fa-th-large"></i>
        </Link>
        {renderedItems}
      </div>
    );
  },
  // need to refactor this
  // react does not have support for props yet
  // once it does, we need to pass in header to route handler
  getHeaderTitle: function() {
    switch(this.getPathname()) {
      case "/nav/contacts":
        return "Contacts"
        break;
      case "/nav/tasks":
        return "Tasks"
        break;
      case "/nav/vendors":
        return "Vendors"
        break;
      case "/nav/attachments":
        return "Attachments"
        break;
      default:
        return ""
    }
  },
  render: function() {
    return (
      <div className="EventAppTile">
        <div className="EventAppTitle">
         {this.getHeaderTitle()}
        </div>
        {this.renderNavItems()}
        <div className="EventApp-content">
          <RouteHandler eventId={this.props.eventId} />
        </div>
      </div>
    );
  }
});

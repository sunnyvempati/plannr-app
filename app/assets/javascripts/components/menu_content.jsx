var MenuContent = React.createClass({
  mainMenuItems: function() {
    return [
      { name: "Events",
        icon_class: "fa fa-ticket",
        href: "/",
        key: '1'
      },
      { name: "Tasks",
        icon_class: "fa fa-check",
        href: "/tasks",
        key: '2'
      },
      { name: "Contacts",
        icon_class: "fa fa-book",
        href: "/contacts",
        key: '3'
      },
      { name: "Vendors",
        icon_class: "fa fa-truck",
        href: "/vendors",
        key: '4'
      }
    ];
  },
  render: function() {
    var mainMenuItems = this.mainMenuItems();
    var active_path = this.props.active_path;
    var mainMenuItems = mainMenuItems.map(function(menu_item) {
      return (
        <MenuItem key={menu_item.key} item={menu_item} isSelected={menu_item.href == active_path} />
      );
    });
    var secondaryMenuItems = <a rel="nofollow" data-method="delete" href="/logout" className="icon fa fa fa-sign-out">Logout</a>;
    return (
      <div className="MenuList">
        {mainMenuItems}
        <div className="MenuList-divider"></div>
        <a rel="nofollow"
           data-method="delete"
           href="/logout"
           className="MenuList-item">
          <div className="MenuList-icon">
            <i className="fa fa-sign-out MenuIcon" />
          </div>
          <div className="MenuList-text">
            Sign Out
          </div>
        </a>
      </div>

    );
  }
});

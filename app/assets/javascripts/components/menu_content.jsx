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
  goToCompanyPage: function() {
    location.href = '/company';
  },
  companyItem: function() {
    var company = this.props.company;
    if (this.props.admin) {
      return (
        <div className="MenuList-companyName u-clickableOnHover"
             onClick={this.goToCompanyPage}>
          {company.name}
        </div>
      );
    } else {
      return (
        <div className="MenuList-companyName">
          {company.name}
        </div>
      )
    }
  },
  render: function() {
    var mainMenuItems = this.mainMenuItems();
    var activePath = this.props.activePath;
    var mainMenuItems = mainMenuItems.map(function(menu_item) {
      return (
        <MenuItem key={menu_item.key} item={menu_item} isSelected={menu_item.href == activePath} />
      );
    });
    return (
      <div className="MenuList">
        {this.companyItem()}
        {mainMenuItems}
      </div>

    );
  }
});

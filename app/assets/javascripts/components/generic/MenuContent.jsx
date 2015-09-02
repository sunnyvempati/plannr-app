import MenuItem from './MenuItem';
import RouteActions from '../../actions/RouteActions';

var MenuContent = React.createClass({
  _mainMenuItems() {
    return [
      { name: "Events",
        icon_class: "fa fa-ticket",
        path: "/",
        key: '1'
      },
      { name: "Tasks",
        icon_class: "fa fa-check",
        path: "tasks",
        key: '2'
      },
      { name: "Contacts",
        icon_class: "fa fa-book",
        path: "contacts",
        key: '3'
      },
      { name: "Vendors",
        icon_class: "fa fa-truck",
        path: "vendors",
        key: '4'
      }
    ];
  },
  goToCompanyPage: function() {
    document.getElementById('menu-trigger').checked = false;
    RouteActions.redirect('company');
  },
  companyItem: function() {
    var company = this.props.company;
    if (this.props.admin) {
      return (
        <div className="MenuList-companyName u-clickableOnHover"
             onClick={this.goToCompanyPage}>
          {company.name}
          <i className="fa fa-cog menuIcon"></i>
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
    var mainMenuItems = this._mainMenuItems();
    var mainMenuItems = mainMenuItems.map(function(menuItem) {
      return (
        <MenuItem key={menuItem.key}
                  item={menuItem} />
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

export default MenuContent;

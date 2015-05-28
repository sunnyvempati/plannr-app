var ProfileDropdownMenu = React.createClass({
  getInitialState: function() {
    return {
      open: false
    };
  },
  test: function() {
    console.log(this.getDOMNode());
    console.log(document.activeElement);
  },
  getProfileMenu: function() {
    var profile = this.props.profile;
    return (
      <div className="ProfileMenu">
        <div className="ProfileMenu-header">
          <div className="ProfileMenu-name">
            {profile.first_name + " " + profile.last_name}
          </div>
          <div className="ProfileMenu-email">
            {this.props.email}
          </div>
        </div>
        <div className="ProfileMenu-actions">
          <a rel="nofollow"
             data-method="delete"
             href="/logout">
            Logout
          </a>
        </div>
      </div>
    )
  },
  getTrigger: function() {
    return (
      <div className="ProfileTrigger">
        {this.props.profile.first_name}
        <i className="fa fa-chevron-down ProfileIcon"></i>
      </div>
    )
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    customOptions={this.getProfileMenu()}
                    triggerClass="ProfileTrigger" />
    );
  }
});
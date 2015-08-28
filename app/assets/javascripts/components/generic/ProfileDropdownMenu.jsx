import DropdownMenu from './DropdownMenu';
import SessionActions from '../../actions/SessionActions';

var ProfileDropdownMenu = React.createClass({
  propTypes: {
    profile: React.PropTypes.object,
    email: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      open: false
    };
  },
  _logout() {
    SessionActions.logout();
  },
  getProfileMenu: function() {
    var profile = this.props.profile;
    let name = profile && profile.first_name + " " + profile.last_name;
    return (
      <div className="ProfileMenu">
        <div className="ProfileMenu-header">
          <div className="ProfileMenu-name">
            {name}
          </div>
          <div className="ProfileMenu-email">
            {this.props.email}
          </div>
        </div>
        <div className="ProfileMenu-actions">
          <div onClick={this._logout} className="u-clickable">
            Logout
          </div>
        </div>
      </div>
    )
  },
  getTrigger: function() {
    let name = this.props.profile && this.props.profile.first_name;
    if (name) {
      return (
        <div className="ProfileTrigger">
          {this.props.profile.first_name}
          <i className="fa fa-chevron-down ProfileIcon"></i>
        </div>
      )
    }
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    customOptions={this.getProfileMenu()}
                    align="right" />
    );
  }
});

export default ProfileDropdownMenu;

import {RouteHandler} from 'react-router';
import SessionStore from '../stores/SessionStore';
import RouteActions from '../actions/RouteActions';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import PageHeader from './generic/PageHeader';
import Menu from './generic/Menu';
import AuthenticatedComponent from './mixins/AuthenticatedComponent';

export default AuthenticatedComponent(
  class Authenticated extends React.Component {

    _closeMenu() {
      document.getElementById('menu-trigger').checked = false;
    }

    _renderPageDecoration() {
      var currentUser = this.props.currentUser;
      if (currentUser && currentUser.company) {
        return (
          <div>
            <input type="checkbox"
                   id="menu-trigger"
                   className="Hamburger-trigger u-checkboxHidden">
            </input>
            <label htmlFor="menu-trigger">
              <i className="fa fa-bars Hamburger-icon"></i>
            </label>
            <div className="Mask" onClick={this._closeMenu}></div>

            <div className="Menu">
              <Menu company={currentUser.company}
                    admin={currentUser.company_admin} />
            </div>
            <div className="MainContainer">
              <PageHeader header="Events" />
              <div className="MainContainer-content">
                <RouteHandler />
              </div>
            </div>
          </div>
        );
      }
    }

    render() {
      return <div>{this._renderPageDecoration()}</div>
    }

  }
);

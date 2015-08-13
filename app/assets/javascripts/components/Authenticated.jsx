import {RouteHandler} from 'react-router';
import SessionStore from '../stores/SessionStore';
import RouteActions from '../actions/RouteActions';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import PageHeader from './generic/PageHeader';
import Menu from './generic/Menu';

var Authenticated = React.createClass({
  getInitialState: function() {
    return {
      currentUser: UserStore.currentUser
    };
  },
  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    if (!SessionStore.isLoggedIn()) {
      RouteActions.redirect('login');
    }
    if (SessionStore.userId) UserActions.get(SessionStore.userId);
  },
  _closeMenu() {
    document.getElementById('menu-trigger').checked = false;
  },
  componentWillUnmount() {
    UserStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState({currentUser: UserStore.currentUser});
  },
  _renderPageDecoration() {
    var currentUser = this.state.currentUser;
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
  },
  render: function() {
    return <div>{this._renderPageDecoration()}</div>
  }
});

export default Authenticated;

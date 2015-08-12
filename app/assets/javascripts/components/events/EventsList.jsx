import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import AuthenticatedComponent from '../mixins/AuthenticatedComponent'

export default AuthenticatedComponent(
  class EventsList extends React.Component {
    componentDidMount() {
      if (!SessionStore.isLoggedIn()) {
        RouteActions.redirect('login');
      }
    }
    _logout() {
      SessionActions.logout();
    }
    render() {
      return (
        <div className="EventsList">
          <h1> {this.props.user ? 'Hello ' + this.props.user.first_name : ''}</h1>
          Events List
          <button className="Button Button--raised" onClick={this._logout}>
            Logout
          </button>
        </div>
      );
    }
  }
);

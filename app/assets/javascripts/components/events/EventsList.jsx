import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import UserStore from '../../stores/UserStore';
import AuthenticatedComponent from '../mixins/AuthenticatedComponent'

class EventsList extends React.Component {
  _logout() {
    SessionActions.logout();
  }
  render() {
    return (
      <div className="EventsList">
        Events List
        <button className="Button Button--raised" onClick={this._logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default EventsList;

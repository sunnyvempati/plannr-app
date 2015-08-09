import RouteActions from '../../actions/RouteActions';
import SessionStore from '../../stores/SessionStore';

class EventsList extends React.Component {
  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteActions.redirect('login');
    }
  }
  render() {
    return (
      <div className="EventsList">
        Events List
      </div>
    );
  }
}

export default EventsList;

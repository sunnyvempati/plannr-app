import {RouteHandler} from 'react-router';
import SessionStore from '../stores/SessionStore';
import RouteActions from '../actions/RouteActions';

var Authenticated = React.createClass({
  componentDidMount() {
    if (!SessionStore.isLoggedIn()) {
      RouteActions.redirect('login');
    }
  },
  render: function() {
    return (
      <RouteHandler />
    );
  }
});

export default Authenticated;

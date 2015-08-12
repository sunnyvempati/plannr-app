import {RouteHandler} from 'react-router';
import SessionStore from '../stores/SessionStore';
import RouteActions from '../actions/RouteActions';
import TopMenu from './generic/TopMenu';
import Footer from './generic/Footer';

var Public = React.createClass({
  componentWillMount: function() {
    if (SessionStore.isLoggedIn()) {
      RouteActions.redirect('app');
    }
  },
  render: function() {
    return (
      <div>
        <TopMenu />
        <div className="AppContainer-content">
          <RouteHandler />
        </div>
        <Footer />
      </div>
    );
  }
});

export default Public;

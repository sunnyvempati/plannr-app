const Router = require('react-router');
const EventsList = require('./components/events/EventsList.jsx');
const App = require('./components/App.jsx');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={EventsList} />
    <Route name="events" path="/events" handler={EventsList}/>
  </Route>
);

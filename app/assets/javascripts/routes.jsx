import Router from 'react-router';
import App from './components/App.jsx';
import EventsList from './components/events/EventsList.jsx';
import LoginForm from './components/session/LoginForm.jsx';
import SignUpForm from './components/session/SignUpForm.jsx';
import ResetPasswordForm from './components/session/ResetPasswordForm.jsx';

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

export default (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={LoginForm} />
    <Route name="signup" path="/sign_up" handler={SignUpForm} />
    <Route name="events" path="/events" handler={EventsList} />
    <Route name="reset" path="/reset_password" handler={ResetPasswordForm} />
  </Route>
);

import {Route, DefaultRoute} from 'react-router';

import App from './components/App';
import Public from './components/Public';
import Authenticated from './components/Authenticated';
import EventsList from './components/events/EventsList';
import LoginForm from './components/session/LoginForm';
import SignUpForm from './components/session/SignUpForm';
import ResetPasswordForm from './components/session/ResetPasswordForm';
import ResetPasswordRequestForm from './components/session/ResetPasswordRequestForm';
import ProfileForm from './components/session/ProfileForm';
import CheckEmail from './components/session/CheckEmail';
import Verify from './components/session/Verify';

export default (
  <Route name="app" path="/" handler={App}>
    <Route handler={Authenticated}>
      <Route name="events" path="/" handler={EventsList} />
      <Route name="events_list" path="/events" handler={EventsList} />
    </Route>
    <Route handler={Public}>
      <Route name="login" path="/login" handler={LoginForm} />
      <Route name="profile" path="/profile" handler={ProfileForm} />
      <Route name="signup" path="/sign_up" handler={SignUpForm} />
      <Route name="check_email" path="/check_email" handler={CheckEmail} />
      <Route name="verify" path="/verify" handler={Verify} />
      <Route name="reset_request" path="/reset_password_request" handler={ResetPasswordRequestForm} />
      <Route name="reset_password" path="/reset_password" handler={ResetPasswordForm} />
    </Route>
  </Route>
);

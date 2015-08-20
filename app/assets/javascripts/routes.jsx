import {Route, DefaultRoute} from 'react-router';

import App from './components/App';
import Public from './components/Public';
import Authenticated from './components/Authenticated';
import EventList from './components/events/EventList';
import EventFormNew from './components/events/EventFormNew';
import EventRouter from './components/events/EventRouter';
import ContactList from './components/contacts/ContactsList';
import VendorList from './components/vendors/VendorList';
import TaskList from './components/tasks/TaskList';
import LoginForm from './components/session/LoginForm';
import SignUpForm from './components/session/SignUpForm';
import ResetPasswordForm from './components/session/ResetPasswordForm';
import ResetPasswordRequestForm from './components/session/ResetPasswordRequestForm';
import ProfileForm from './components/session/ProfileForm';
import CheckEmail from './components/session/CheckEmail';
import Verify from './components/session/Verify';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="profile" path="/profile" handler={ProfileForm} />
    <Route handler={Authenticated}>
      <Route name="events" path="/" handler={EventList} />
      <Route name="events_list" path="/events" handler={EventList} />
      <Route name="events_new" path="/events/new" handler={EventFormNew} />
      <Route name="event" path="/events/:id" handler={EventRouter} />
      <Route name="contacts" path="/contacts" handler={ContactList} />
      <Route name="tasks" path="/tasks" handler={TaskList} />
      <Route name="vendors" path="/vendors" handler={VendorList} />
    </Route>
    <Route handler={Public}>
      <Route name="login" path="/login" handler={LoginForm} />
      <Route name="signup" path="/sign_up" handler={SignUpForm} />
      <Route name="check_email" path="/check_email" handler={CheckEmail} />
      <Route name="verify" path="/verify" handler={Verify} />
      <Route name="reset_request" path="/reset_password_request" handler={ResetPasswordRequestForm} />
      <Route name="reset_password" path="/reset_password" handler={ResetPasswordForm} />
    </Route>
  </Route>
);

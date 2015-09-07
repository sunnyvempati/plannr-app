import {Route, DefaultRoute} from 'react-router';

import App from './components/App';
import Public from './components/Public';
import Authenticated from './components/Authenticated';
import EventList from './components/events/EventList';
import EventFormNew from './components/events/EventFormNew';
import EventFormEdit from './components/events/EventFormEdit';
import TaskList from './components/tasks/TaskList';
import Contacts from './components/contacts/Contacts';
import Contact from './components/contacts/Contact';
import ContactList from './components/contacts/ContactList';
import ContactFormNew from './components/contacts/ContactFormNew';
import ContactFormEdit from './components/contacts/ContactFormEdit';
import Vendors from './components/vendors/Vendors';
import Vendor from './components/vendors/Vendor';
import VendorFormNew from './components/vendors/VendorFormNew';
import VendorFormEdit from './components/vendors/VendorFormEdit';
import VendorList from './components/vendors/VendorList';
import LoginForm from './components/session/LoginForm';
import SignUpForm from './components/session/SignUpForm';
import ResetPasswordForm from './components/session/ResetPasswordForm';
import ResetPasswordRequestForm from './components/session/ResetPasswordRequestForm';
import ProfileForm from './components/session/ProfileForm';
import CheckEmail from './components/session/CheckEmail';
import Verify from './components/session/Verify';
import EventDashboard from './components/events/EventDashboard';
import EventApp from './components/events/EventApp';
import EventContactList from './components/event_contacts/EventContactList';
import EventTaskList from './components/event_tasks/EventTaskList';
import EventAttachmentList from './components/event_attachments/EventAttachmentList';
import EventVendorList from './components/event_vendors/EventVendorList';
import EventBudget from './components/event_budget/EventBudget';
import EventBudgetList from './components/event_budget/EventBudgetList';
import EventComments from './components/events/EventComments';
import Company from './components/companies/Company';
import ExpenseCategoryForm from './components/event_budget/ExpenseCategoryForm';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="profile" path="/profile" handler={ProfileForm} />
    <Route handler={Authenticated}>
      <Route name="events" path="/" handler={EventList} />
      <Route name="events_list" path="/events" handler={EventList} />
      <Route name="event_new" path="/events/new" handler={EventFormNew} />
      <Route name="event_edit" path="/edit_event/:id" handler={EventFormEdit} />
      <Route name="event" path="/events/:id" handler={EventDashboard} ignoreScrollBehavior>
        <Route name="event_contacts" path="contacts" handler={EventContactList} ignoreScrollBehavior />
        <Route name="event_tasks" path="tasks" handler={EventTaskList} ignoreScrollBehavior />
        <Route name="event_attachments" path="attachments" handler={EventAttachmentList} ignoreScrollBehavior />
        <Route name="event_vendors" path="vendors" handler={EventVendorList} ignoreScrollBehavior />
        <Route name="event_budget" path="budget" handler={EventBudget} ignoreScrollBehavior>
          <Route name="expense_category_form" path="add_category" handler={ExpenseCategoryForm} ignoreScrollBehavior />
          <DefaultRoute name="event_budget_list" handler={EventBudgetList} ignoreScrollBehavior />
        </Route>
        <Route name="event_comments" path="comments" handler={EventComments} ignoreScrollBehavior />
        <DefaultRoute name="event_app" handler={EventApp} ignoreScrollBehavior />
      </Route>
      <Route name="contacts" path="/contacts" handler={Contacts}>
        <Route name="contact" path=":id" handler={Contact} />
        <DefaultRoute handler={ContactList} />
      </Route>
      <Route name="contact_new" path="/new_contact" handler={ContactFormNew} />
      <Route name="contact_edit" path="/edit_contact/:id" handler={ContactFormEdit} />
      <Route name="vendors" path="/vendors" handler={Vendors}>
        <Route name="vendor" path=":id" handler={Vendor} />
        <DefaultRoute handler={VendorList} />
      </Route>
      <Route name="vendor_new" path="/new_vendor" handler={VendorFormNew} />
      <Route name="vendor_edit" path="/edit_vendor/:id" handler={VendorFormEdit} />
      <Route name="tasks" path="/tasks" handler={TaskList} />
      <Route name="company" path="/company" handler={Company} />
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

import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';

class ContactsList extends React.Component {
  componentDidMount() {
    this.props.setHeader("Contacts");
  }

  _logout() {
    SessionActions.logout();
  }
  render() {
    return (
      <div className="ContactsList">
        Contacts List
      </div>
    );
  }
}

export default ContactsList;

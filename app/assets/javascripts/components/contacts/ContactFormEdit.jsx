import ContactForm from './ContactForm';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import PageTitleActions from '../../actions/PageTitleActions';

var ContactFormEdit = React.createClass({
  getContactState() {
    return {
      contact: ContactStore.get(this.props.params.id) || null
    }
  },
  getInitialState: function() {
    return this.getContactState();
  },
  componentDidMount() {
    PageTitleActions.setPageTitle("Edit Contact", true);
    ContactStore.addChangeListener(this._onChange);
    if (!this.state.contact) ContactActions.get(this.props.params.id);
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(this.getContactState());
  },
  render() {
    return (
      <ContactForm model={this.state.contact} type="OLD" />
    );
  }
});

export default ContactFormEdit;

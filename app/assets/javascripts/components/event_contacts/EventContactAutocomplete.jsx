import AutocompleteBoldItem from '../mixins/AutocompleteBoldItem';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import ModalActions from '../../actions/ModalActions';
import EventContactActions from '../../actions/EventContactActions';
import Autocomplete from '../generic/Autocomplete';

var EventContactAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem],
  getInitialState: function() {
    return {
      contacts: []
    };
  },
  componentDidMount: function () {
    ContactStore.addChangeListener(this._onContactChange);
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onContactChange);
  },
  _onContactChange() {
    let returnedContacts = ContactStore.searchResults;
    if (!returnedContacts.length) returnedContacts.push({name: 'Create new contact', id: -1});
    this.setState({contacts: returnedContacts});
  },
  retrieveContacts: function(term) {
    var params = {
      search_query: term,
      not_in_event_id: this.props.eventId
    };
    ContactActions.search(params);
  },
  onCreateContactSuccess(contact) {
    ModalActions.close();
    this.createEventContact(this.props.eventId, contact.id)
  },
  itemSelected: function(contact, term) {
    if (contact.id == -1) {
      let payload = {name: term};
      let props = {model: payload, onSuccess: this.onCreateContactSuccess};
      ModalActions.openEditContactModal(props);
    }
    else this.createEventContact(this.props.eventId, contact.id);
  },
  createEventContact(eventId, contactId) {
    EventContactActions.create(eventId, contactId);
  },
  render: function() {
    return (
      <Autocomplete name="contact"
                    retrieveData={this.retrieveContacts}
                    data={this.state.contacts}
                    itemSelected={this.itemSelected}
                    placeholder="Add contact to event..."
                    renderItem={this.renderItem} />
    );
  }
});

export default EventContactAutocomplete;

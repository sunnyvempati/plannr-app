import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import EventContactStore from '../../stores/EventContactStore';

var EventClientInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    ContactStore.addChangeListener(this._onSearchItemsChange);
    EventContactStore.addChangeListener(this._eventClientChange);
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onSearchItemsChange);
    EventContactStore.addChangeListener(this._eventClientChange);
  },
  _onSearchItemsChange() {
    let returnedContacts = ContactStore.searchResults;
    if (!returnedContacts.length) returnedContacts.push({name: 'Create new contact', id: -1});
    this.setState({items: returnedContacts});
  },
  _eventClientChange() {
    let eventClient = EventContactStore.eventClient;
    if (eventClient) {
      let clientName = ContactStore.getContact(eventClient.contact_id).name;
      this.setState({itemSet: true, itemDisplay: clientName});
    }
  },
  retrieveItem: function(id) {
    let client = ContactStore.getContact(id), itemDisplay = "";
    if (client) {
      itemDisplay = client.name
    } else ContactActions.getEventClient(id);
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_category: 1, // Search only clients
      with_search_limit: 5
    };

    ContactActions.search(params);
  },
  itemSelected: function(client, term) {
    let itemSet = false, itemDisplay = "";
    if (client.id == -1) {
      // category 1 = client contact
      // take term which is the text value in input field
      // and create contact
      var payload = {contact: {name: term, category: 1}};
      ContactActions.create(payload);
    }
    else {
      this.setValue(client.id);
      this.setState({itemSet: true, itemDisplay: client.name});
    }
  }
});

export default EventClientInput;

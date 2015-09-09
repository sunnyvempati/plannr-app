import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import AutocompleteCreateStore from '../../stores/AutocompleteCreateStore';

var EventClientInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    ContactStore.addChangeListener(this._onContactChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateEventClientChange);
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onContactChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateEventClientChange);
  },
  _onContactChange() {
    let returnedContacts = ContactStore.searchResults;
    if (!returnedContacts.length) returnedContacts.push({name: 'Create new contact', id: -1});
    let id = this.getValue();
    let itemFound = !!id && ContactStore.get(id);
    this.setState({
      items: returnedContacts,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  _onCreateEventClientChange() {
    if (!AutocompleteCreateStore.errors) {
      let entity = AutocompleteCreateStore.entity;
      let eventClientName = entity && entity.name;
      this.setValue(entity && entity.id);
      if (eventClientName) this.setState({itemSet: true, itemDisplay: eventClientName});
    }
  },
  retrieveItem: function(id) {
    let client = ContactStore.get(id);
    if (client) {
      this.setState({itemSet: true, itemDisplay: client.name});
    } else ContactActions.get(id);
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
      ContactActions.create(payload, true);
    }
    else {
      this.setValue(client.id);
      this.setState({itemSet: true, itemDisplay: client.name});
    }
  }
});

export default EventClientInput;

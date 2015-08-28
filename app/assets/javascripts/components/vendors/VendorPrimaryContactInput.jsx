import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import FormStore from '../../stores/FormStore';

var VendorPrimaryContactInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount: function() {
    ContactStore.addChangeListener(this._onContactChange);
    FormStore.addChangeListener(this._onCreateContactChange);
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onContactChange);
    FormStore.addChangeListener(this._onCreateContactChange);
  },
  retrieveItem: function(id) {
    let item = ContactStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else ContactActions.get(id);
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
  _onCreateContactChange() {
    if (!FormStore.errors) {
      let primaryContactName = FormStore.entity.name;
      this.setValue(FormStore.entity.id);
      this.setState({itemSet: true, itemDisplay: primaryContactName});
    }
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    ContactActions.search(params);
  },
  itemSelected: function(contact, term) {
    let itemSet = false, itemDisplay = "";
    if (contact.id == -1) {
      var payload = {contact: {name: term, category: 2}};
      ContactActions.create(payload);
    }
    else {
      this.setValue(contact.id);
      this.setState({itemSet: true, itemDisplay: contact.name});
    }
  }
});

export default VendorPrimaryContactInput;

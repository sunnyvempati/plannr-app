import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import VendorStore from '../../stores/VendorStore';
import VendorActions from '../../actions/VendorActions';
import FormStore from '../../stores/FormStore';

var ContactVendorInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount: function() {
    VendorStore.addChangeListener(this._onVendorChange);
    FormStore.addChangeListener(this._onCreateVendorChange);
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onVendorChange);
    FormStore.addChangeListener(this._onCreateVendorChange);
  },
  retrieveItem: function(id) {
    let item = VendorStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else VendorActions.get(id);
  },
  _onVendorChange() {
    let returnedVendors = VendorStore.searchResults;
    if (!returnedVendors.length) returnedVendors.push({name: 'Create new vendor', id: -1});
    let id = this.getValue();
    let itemFound = !!id && VendorStore.get(id);
    this.setState({
      items: returnedVendors,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  _onCreateVendorChange() {
    if (!FormStore.errors) {
      let clientVendorName = FormStore.entity.name;
      this.setValue(FormStore.entity.id);
      this.setState({itemSet: true, itemDisplay: clientVendorName});
    }
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    VendorActions.search(params);
  },
  itemSelected: function(vendor, term) {
    let itemSet = false, itemDisplay = "";
    if (vendor.id == -1) {
      var payload = {vendor: {name: term}};
      VendorActions.create(payload);
    }
    else {
      this.setValue(vendor.id);
      this.setState({itemSet: true, itemDisplay: vendor.name});
    }
  }
});

export default ContactVendorInput;

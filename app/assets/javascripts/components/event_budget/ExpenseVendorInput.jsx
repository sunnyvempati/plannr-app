import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import VendorStore from '../../stores/VendorStore';
import AutocompleteCreateStore from '../../stores/AutocompleteCreateStore';
import VendorActions from '../../actions/VendorActions';

var ExpenseVendorInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount: function() {
    VendorStore.addChangeListener(this._onChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateVendorChange);
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateVendorChange);
  },
  retrieveItem(id) {
    let item = VendorStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else VendorActions.get(id);
  },
  _onChange() {
    let returnedVendors = VendorStore.searchResults;
    if (!returnedVendors.length) returnedVendors.push({name: 'Create new vendor', id: -1});
    let id = this.getValue();
    let itemFound = !!id && VendorStore.get(id);
    this.setState({
      items: VendorStore.searchResults,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  _onCreateVendorChange() {
    if (!AutocompleteCreateStore.errors) {
      let vendorName = AutocompleteCreateStore.entity.name;
      this.setValue(AutocompleteCreateStore.entity.id);
      this.setState({itemSet: true, itemDisplay: vendorName});
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
      VendorActions.create(payload, true);
    }
    else {
      this.setValue(vendor.id);
      this.setState({itemSet: true, itemDisplay: vendor.name});
    }
  }
});

export default ExpenseVendorInput;

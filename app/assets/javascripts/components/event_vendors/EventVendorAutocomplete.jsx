import AutocompleteBoldItem from '../mixins/AutocompleteBoldItem';
import VendorStore from '../../stores/VendorStore';
import VendorActions from '../../actions/VendorActions';
import ModalActions from '../../actions/ModalActions';
import EventVendorActions from '../../actions/EventVendorActions';
import Autocomplete from '../generic/Autocomplete';

var EventVendorAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem],
  getInitialState: function() {
    return {
      vendors: []
    };
  },
  componentDidMount: function () {
    VendorStore.addChangeListener(this._onContactChange);
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onContactChange);
  },
  _onContactChange() {
    let returnedVendors = VendorStore.searchResults;
    if (!returnedVendors.length) returnedVendors.push({name: 'Create new vendor', id: -1});
    this.setState({vendors: returnedVendors});
  },
  retrieveVendors: function(term) {
    var params = {
      search_query: term,
      not_in_event_id: this.props.eventId
    };
    VendorActions.search(params);
  },
  onCreateVendorSuccess(vendor) {
    ModalActions.close();
    this.createEventVendor(this.props.eventId, vendor.id)
  },
  itemSelected: function(vendor, term) {
    if (vendor.id == -1) {
      let payload = {name: term};
      let props = {model: payload, onSuccess: this.onCreateVendorSuccess};
      ModalActions.openEditVendorModal(props);
    }
    else this.createEventVendor(this.props.eventId, vendor.id);
  },
  createEventVendor(eventId, vendorId) {
    EventVendorActions.create(eventId, vendorId);
  },
  render: function() {
    return (
      <Autocomplete name="vendor"
                    retrieveData={this.retrieveVendors}
                    data={this.state.vendors}
                    itemSelected={this.itemSelected}
                    placeholder="Add vendor to event..."
                    renderItem={this.renderItem} />
    );
  }
});

export default EventVendorAutocomplete;

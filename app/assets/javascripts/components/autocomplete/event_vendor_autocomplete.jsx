var EventVendorAutocomplete = React.createClass({
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      vendors: []
    };
  },
  retrieveVendors: function(term) {
    $.get("search_other_vendors", {search: {text: term}}, function(result) {
      var vendors = result.vendors;
      if (vendors.length == 0) {
        vendors.push(AutocompleteRenderNew.getNewItem("vendor"));
      }
      this.setState({vendors: vendors})
    }.bind(this));
  },
  addVendorToEvent: function(vendor, term) {
    var eventVendorPayload = vendor.id == -1 ? {name: term} : {vendor_id: vendor.id};
    var payload = {event_vendor: eventVendorPayload};
    $.post("vendors", payload, function(result) {
      this.props.onAssociation(result.event_vendor_with_vendor);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="vendor"
                    retrieveData={this.retrieveVendors}
                    data={this.state.vendors}
                    itemSelected={this.addVendorToEvent}
                    placeholder="Add vendor to event..."
                    renderItem={AutocompleteRenderNew.renderItem}/>
    );
  }
});

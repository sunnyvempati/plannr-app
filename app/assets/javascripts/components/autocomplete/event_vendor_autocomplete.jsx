var EventVendorAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      vendors: []
    };
  },
  retrieveVendors: function(term) {
    $.get("search_other_vendors", {search: {text: term}},  function(result) {
      var vendors = result.vendors;
      if (vendors.length == 0) {
        vendors.push(this.getNewItem("vendor"));
      }
      this.setState({vendors: vendors})
    }.bind(this));
  },
  onAutocompleteItemSelected: function (e, item, term) {
    if (id === -1) {
      this.quickCreateItem(term);
    }else {
      this.setItem(item.id, item.name);
    }
  },
  quickCreateEventVendor: function (term) {

  },
  //TODO: fix this using
  // quickCreateItemCallback={this.quickCreateItemAndSetItem}
//setItemCallback={this.setItem}
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
                    itemSelectedCallback={this.addVendorToEvent}
                    placeholder="Add vendor to event..."
                    renderItem={this.renderItem}
                    itemSelectedCallback={this.onAutocompleteItemSelected}/>
    );
  }
});

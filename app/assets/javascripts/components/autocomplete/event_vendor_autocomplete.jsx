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
    $.get("search_other_vendors", {search: {text: term}},  function(result) {
      this.setState({vendors: result.vendors})
    }.bind(this));
  },
  addVendorToEvent: function(vendor) {
    var payload = {event_vendor: {vendor_id: vendor.id}};
    $.post("vendors", payload, function(result) {
      this.props.onAssociation(result.event_vendor_with_vendor);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="vendor"
                    retrieveData={this.retrieveVendors}
                    data={this.state.vendors}
                    itemSelected={this.addVendorToEvent} />
    );
  }
});

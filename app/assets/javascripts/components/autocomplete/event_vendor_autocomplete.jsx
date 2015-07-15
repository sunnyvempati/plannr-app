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
    var params = {
      filter_sort: {
        search_query: term,
        not_in_event_id: this.props.eventId
      }
    };
    $.get("/vendors.json", params, function(result) {
      var vendors = result.vendors;
      if (vendors.length == 0) {
        vendors.push(this.getNewItem("vendor"));
      }
      this.setState({vendors: vendors})
    }.bind(this));
  },
  itemSelected: function(vendor, term) {
    if (vendor.id == -1) {
      var payload = {name: term};
      var props = {
        model: payload,
        onAssociation: this.props.onAssociation,
        authToken: this.props.authToken
      }
      var modal = React.createElement(CreateVendorModal, props);
      React.render(modal, document.getElementById('modal'));
    }
    else {
      var payload = {event_vendor: {vendor_id: vendor.id}};
      Utils.post("vendors", payload, function(result) {
        this.props.onAssociation(result.event_vendor_with_vendor);
      }.bind(this));
    }
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

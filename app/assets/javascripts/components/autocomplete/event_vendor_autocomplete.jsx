var EventVendorAutocomplete = React.createClass({
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  retrieveOtherVendors: function(request, response) {
    $.get("search_other_vendors", {search: {text: request.term}},  function(result) {
      response(result.vendors);
    }.bind(this));
  },
  renderAutoCompleteList: function(item) {
    return $("<li>").append(item.name);
  },
  addVendorToEvent: function(event, ui) {
    var payload = {event_vendor: {vendor_id: ui.item.id}};
    $.post("vendors", payload, function(result) {
      this.props.onAssociation(result.event_vendor_with_vendor);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="vendor"
                    retrieveDataAsync={this.retrieveOtherVendors}
                    renderAutoCompleteList={this.renderAutoCompleteList}
                    itemSelected={this.addVendorToEvent} />
    );
  }
});
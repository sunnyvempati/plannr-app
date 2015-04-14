var EventContactAutocomplete = React.createClass({
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  retrieveOtherContacts: function(request, response) {
    $.get("search_other_contacts", {search: {text: request.term}},  function(result) {
      response(result.contacts);
    }.bind(this));
  },
  renderAutoCompleteList: function(item) {
    return $("<li>").append(item.name + "<br>" + item.email);
  },
  addContactToEvent: function(event, ui) {
    var payload = {event_contact: {contact_id: ui.item.id}};
    $.post("contacts", payload, function(result) {
      this.props.onAssociation(result.event_contact_with_contact);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="contact"
                    retrieveDataAsync={this.retrieveOtherContacts}
                    renderAutoCompleteList={this.renderAutoCompleteList}
                    itemSelected={this.addContactToEvent} />
    );
  }
});

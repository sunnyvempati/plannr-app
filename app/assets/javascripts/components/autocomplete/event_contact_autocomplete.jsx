var EventContactAutocomplete = React.createClass({
  retrieveOtherContacts: function(request, response) {
    var event_id = this.props.eventId;
    var url = "/events/" + event_id + "/search_other_contacts";
    $.get(url, {search: {event_id: event_id, text: request.term}},  function(result) {
      response(result.contacts);
    }.bind(this));
  },
  renderAutoCompleteList: function(item) {
    return $("<li>").append(item.name + "<br>" + item.email);
  },
  addContactToEvent: function(event, ui) {
    var eventId = this.props.eventId;
    var url = "/events/" + eventId + "/contacts";
    $.post(url,
      {event_contact: {event_id: eventId,contact_id: ui.item.id}},
      function(result) {
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

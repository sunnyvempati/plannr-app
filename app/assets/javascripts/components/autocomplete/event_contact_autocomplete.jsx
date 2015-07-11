var EventContactAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      contacts: []
    };
  },
  retrieveContacts: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        not_in_event_id: this.props.eventId
      }
    };
    $.get("/contacts.json", params,  function(result) {
      var contacts = result.contacts;
      if (contacts.length == 0) {
        contacts.push(this.getNewItem("contact"));
      }
      this.setState({contacts: contacts});
    }.bind(this));
  },
  addContactToEvent: function(contact, term) {
    var eventContactPayload = contact.id == -1 ? {name: term} : {contact_id: contact.id};
    var payload = {event_contact: eventContactPayload};
    $.post("contacts", payload, function(result) {
      this.props.onAssociation(result.event_contact_with_contact);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="contact"
                    retrieveData={this.retrieveContacts}
                    data={this.state.contacts}
                    itemSelected={this.addContactToEvent}
                    placeholder="Add contact to event..."
                    renderItem={this.renderItem} />
    );
  }
});

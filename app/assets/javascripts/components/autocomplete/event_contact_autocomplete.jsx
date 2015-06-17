var EventContactAutocomplete = React.createClass({
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      contacts: []
    };
  },
  retrieveContacts: function(term) {
    $.get("search_other_contacts", {search: {text: term}}, function(result) {
      var contacts = result.contacts;
      if (contacts.length == 0) {
        contacts.push(AutocompleteRenderNew.getNewItem("contact"));
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
                    renderItem={AutocompleteRenderNew.renderItem}/>
    );
  }
});

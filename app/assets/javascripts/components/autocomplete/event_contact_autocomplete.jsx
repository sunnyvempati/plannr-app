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
    $.get("search_other_contacts", {search: {text: term}},  function(result) {
      this.setState({contacts: result.contacts});
    }.bind(this));
  },
  addContactToEvent: function(contact) {
    var payload = {event_contact: {contact_id: contact.id}};
    $.post("contacts", payload, function(result) {
      this.props.onAssociation(result.event_contact_with_contact);
    }.bind(this))
  },
  render: function() {
    return (
      <Autocomplete name="contact"
                    retrieveData={this.retrieveContacts}
                    data={this.state.contacts}
                    itemSelected={this.addContactToEvent} />
    );
  }
});

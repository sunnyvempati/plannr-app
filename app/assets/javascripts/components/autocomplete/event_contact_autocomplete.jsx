var EventContactAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem],
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
    $.get("/contacts.json", params, function(result) {
      var contacts = result.contacts;
      if (contacts.length == 0) {
        var newContact = {name: "Create new contact",id: -1};
        contacts = [newContact];
      }
      this.setState({contacts: contacts});
    }.bind(this));
  },
  itemSelected: function(contact, term) {
    if (contact.id == -1) {
      var payload = {name: term};
      var props = {
        model: payload,
        onAssociation: this.props.onAssociation,
        authToken: this.props.authToken
      }
      var modal = React.createElement(EditContactModal, props);
      React.render(modal, document.getElementById('modal'));
    }
    else {
      var payload = {event_contact: {contact_id: contact.id}};
      Utils.post("contacts", payload, function(result) {
        this.props.onAssociation(result.event_contact_with_contact);
      }.bind(this));
    }
  },
  render: function() {
    return (
      <Autocomplete name="contact"
                    retrieveData={this.retrieveContacts}
                    data={this.state.contacts}
                    itemSelected={this.itemSelected}
                    placeholder="Add contact to event..."
                    renderItem={this.renderItem} />
    );
  }
});

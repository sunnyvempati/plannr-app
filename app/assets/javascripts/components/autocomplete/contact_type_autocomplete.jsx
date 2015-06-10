var ContactTypeAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      contactTypes: ['Client', 'Vendor']
    };
  },
  retrieveContactTypes: function (term) {
    if (!!term) {
      term = '';
    }
    var newState = [];
    this.state.contactTypes.each(
      function (currentValue, index, array) {
        if (currentValue.toLowerCase().indexOf(term.toLowerCase())) {
          newState.push(currentValue);
        }
      }
    );
    this.setState({contactType: newState});
  },
  //TODO: something when selected
  addContactToEvent: function (contact, term) {
    var eventContactPayload = contact.id == -1 ? {name: term} : {contact_id: contact.id};
    var payload = {event_contact: eventContactPayload};
    $.post("contacts", payload, function (result) {
      this.props.onAssociation(result.event_contact_with_contact);
    }.bind(this))
  },
  render: function () {
    return (
      <Autocomplete name="contact_type"
                    retrieveData={this.retrieveContactTypes}
                    data={this.state.contacts}
                    itemSelected={this.addContactToEvent}
                    placeholder="Select Contact Type..."
                    renderItem={this.renderItem}/>
    );
  }
});

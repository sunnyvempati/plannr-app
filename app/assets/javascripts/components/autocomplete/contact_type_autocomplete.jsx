var ContactTypeAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    onAssociation: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      contactTypes: [{id: 1, name: 'Client'}, {id: 2, name: 'Vendor'}]
    };
  },
  retrieveContactTypes: function (term) {
    if (term == null) {
      term = '';
    }
    var newState = [];
    this.getInitialState().contactTypes.forEach(
      function (currentValue, index, array) {
        if (currentValue.name.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
          newState.push(currentValue);
        }
      }
    );
    this.setState({contactTypes: newState});
  },
  //TODO: something when selected
  addContactToEvent: function (contact, term) {
    //var eventContactPayload = contact.id == -1 ? {name: term} : {contact_id: contact.id};
    //var payload = {event_contact: eventContactPayload};
    //$.post("contacts", payload, function (result) {
    //  this.props.onAssociation(result.event_contact_with_contact);
    //}.bind(this))
  },
  render: function () {
    return (
      <Autocomplete id="contact_type"
                    name="contact_type"
                    label="Contact Type*"
                    retrieveData={this.retrieveContactTypes}
                    data={this.state.contactTypes}
                    itemSelected={this.addContactToEvent}
                    placeholder="Select Contact Type..."
                    renderItem={this.renderItem}/>
    );
  }
});

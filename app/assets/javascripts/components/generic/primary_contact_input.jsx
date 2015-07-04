var PrimaryContactInput = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      contactSelected: false,
      contactName: null,
      contacts: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var contactValue = this.getValue();
    if (contactValue) {
      $.get("/contacts/" + contactValue + ".json", function(result) {
        if (this.isMounted()) {
          this.setState({contactSelected: true, contactName: result.contact.name});
        }
      }.bind(this));
    }
  },
  retrieveContacts: function(term) {
    $.get("/search_contacts", {search: {text: term || ""}}, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        // uses autocomplete render new mixin
        // to create a row item "Create new contact"
        // the argument is the entity to create
        contacts.push(AutocompleteRenderNew.getNewItem("contact"));
      }
      this.setState({contacts: contacts});
    }.bind(this));
  },
  addToForm: function(contact, term) {
    if (contact.id == -1) {
      // category 2 = vendor contact
      // take term which is the text value in input field
      // and create contact
      var payload = {contact: {name: term, category: 2}};
      $.post("/contacts.json", payload, function(result) {
        this.setValue(result.contact.id);
        this.setState({contactSelected: true, contactName: result.contact.name});
      }.bind(this))
    }
    else {
      this.setValue(contact.id);
      this.setState({contactSelected: true, contactName: contact.name});
    }
  },
  editContact: function() {
    this.setState({contactSelected: false, contactName: null, contacts: [], focus: true});
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveContacts}
                    itemSelected={this.addToForm}
                    data={this.state.contacts}
                    focus={this.state.focus}
                    renderItem={AutocompleteRenderNew.renderItem} />
    );
  },
  renderSelectedContact: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.editContact}>
        <div className="Autocomplete-pickedName">
          {this.state.contactName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.contactSelected ? this.renderSelectedContact() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

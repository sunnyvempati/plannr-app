var ClientInput = React.createClass({
  mixins: [Formsy.Mixin, boldAutocompleteItem],
  getInitialState: function() {
    return {
      clientSelected: false,
      clientName: null,
      clients: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var clientValue = this.getValue();
    if (clientValue) {
      $.get("/contacts/" + clientValue + ".json", function(result) {
        this.setState({clientSelected: true, clientName: result.contact.name});
      }.bind(this));
    }
  },
  getCreateNewContactItem: function() {
    return {
      name: "Create New Contact",
      id: -1
    }
  },
  retrieveClients: function(term) {
    $.get("/search_clients", {search: {text: term || ""}}, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        contacts.push(this.getCreateNewContactItem());
      }
      this.setState({clients: contacts});
    }.bind(this));
  },
  addToForm: function(client, term) {
    var client_id = 0, name = "";
    if (client.id == -1) {
      // category 1 = client contact
      // take term which is the text value in input field
      // and create contact
      var payload = {contact: {name: term, category: 1}};
      $.post("/contacts.json", payload, function(result) {
        this.setValue(result.contact.id);
        this.setState({clientSelected: true, clientName: result.contact.name});
      }.bind(this))
    }
    else {
      this.setValue(client.id);
      this.setState({clientSelected: true, clientName: client.name});
    }
  },
  editClient: function() {
    this.setState({clientSelected: false, clientName: null, clients: [], focus: true});
  },
  clientItem: function(item, term) {
    var itemName = this.formatMatchedCharacters(item.name, term);
    var itemClasses = classNames({
      'Autocomplete-resultsItem': true,
      'u-italics': item.id == -1
    });
    return (
      <div className={itemClasses}
           dangerouslySetInnerHTML={{__html: itemName}}>
      </div>
    );
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveClients}
                    itemSelected={this.addToForm}
                    data={this.state.clients}
                    focus={this.state.focus}
                    renderItem={this.clientItem} />
    );
  },
  renderSelectedClient: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.editClient}>
        <div className="Autocomplete-pickedName">
          {this.state.clientName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.clientSelected ? this.renderSelectedClient() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

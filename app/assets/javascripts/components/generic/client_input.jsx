var ClientInput = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
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
        if (this.isMounted()) {
          this.setState({clientSelected: true, clientName: result.contact.name});
        }
      }.bind(this));
    }
  },
  retrieveClients: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_category: 1 // Search only clients
      }
    };
    $.get("/contacts.json", params, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        // uses autocomplete render new mixin
        // to create a row item "Create new contact"
        // the argument is the entity to create
        contacts.push(this.getNewItem("contact"));
      }
      this.setState({clients: contacts});
    }.bind(this));
  },
  addToForm: function(client, term) {
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
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveClients}
                    itemSelected={this.addToForm}
                    data={this.state.clients}
                    focus={this.state.focus}
                    renderItem={this.renderItem} />
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
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

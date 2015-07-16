var EventClientInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  retrieveItem: function(id) {
    Utils.get('/contacts/' + id + '.json', {}, function(result) {
      if (this.isMounted()) {
        this.setState({itemSet: true, itemDisplay: result.contact.name});
      }
    }.bind(this));
  },
  retrieveData: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_category: 1, // Search only clients
        with_search_limit: 5
      }
    };
    Utils.get("/contacts.json", params, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        // uses autocomplete render new mixin
        // to create a row item "Create new contact"
        // the argument is the entity to create
        var newContact = {name: "Create new contact",id: -1};
        contacts = [newContact];
      }
      this.setState({items: contacts});
    }.bind(this));
  },
  itemSelected: function(client, term) {
    if (client.id == -1) {
      // category 1 = client contact
      // take term which is the text value in input field
      // and create contact
      var payload = {contact: {name: term, category: 1}};
      Utils.post("/contacts.json", payload, function(result) {
        this.setValue(result.contact.id);
        this.setState({itemSet: true, itemDisplay: result.contact.name});
      }.bind(this))
    }
    else {
      this.setValue(client.id);
      this.setState({itemSet: true, itemDisplay: client.name});
    }
  }
});

var PrimaryContactInput = React.createClass({
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
        with_search_limit: 5
      }
    };
    $.get("/contacts.json", params, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        var newContact = {name: "Create new contact",id: -1};
        contacts = [newContact];
      }
      this.setState({items: contacts});
    }.bind(this));
  },
  itemSelected: function(contact, term) {
    if (contact.id == -1) {
      var payload = {contact: {name: term, category: 2}};
      $.post("/contacts.json", payload, function(result) {
        this.setValue(result.contact.id);
        this.setState({itemSet: true, itemDisplay: result.contact.name});
      }.bind(this))
    }
    else {
      this.setValue(contact.id);
      this.setState({itemSet: true, itemDisplay: contact.name});
    }
  }
});

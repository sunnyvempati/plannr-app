var ClientAutocompleteFormInput = React.createClass({
  mixins: [Formsy.Mixin, boldAutocompleteItem],
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string
  },
  getCreateNewAutocompleteItem: function() {
    return {
      name: "Create New Client",
      id: -1
    }
  },
  retrieveAutocompleteListAsync: function(term) {
    $.post("/search_clients", {search: {text: term || ""}}, function(result) {
      var contacts = result.contacts;
      if(contacts.length == 0) {
        contacts.push(this.getCreateNewAutocompleteItem());
      }
      this.setState({autocompleteList: contacts});
    }.bind(this));
  },
  onAutocompleteItemSelected: function(id, name) {
    this.setValue(id);
    this.setState({autocompleteSelectedValue: {id: id, name: name}});
  },
  setAutocompleteValueAsync: function(clientId) {
    if (clientId) {
      $.get("/clients/" + clientId + ".json", function(result) {
        if (this.isMounted()) {
          this.setState({autocompleteSelectedValue: {id: result.client.id, name: result.client.name}});
        }
      }.bind(this));
    }
  },
  onClickToEdit: function() {
    this.setState({ autocompleteSelectedValue: { id: -2, name: ''}  });
    this.setState({ autocompleteFormInputFocus: true });
  },
  getInitialState: function() {
    return {
      autocompleteList: [],
      autocompleteSelectedValue: {id: -2, name: ''},
      autocompleteFormInputFocus: false
    };
  },
  componentDidMount: function() {
    this.setAutocompleteValueAsync(this.getValue());
  },
  render: function() {
    return (
      <AutocompleteFormInput  name={this.props.name}
                              retrieveData={this.retrieveAutocompleteListAsync}
                              itemSelected={this.onAutocompleteItemSelected}
                              autocompleteSelectedValue={this.state.autocompleteSelectedValue}
                              autocompleteList={this.state.autocompleteList}
                              onClickToEdit={this.onClickToEdit}
                              label={'client'}
                              focus={this.state.autocompleteFormInputFocus} />
      );
  }
});

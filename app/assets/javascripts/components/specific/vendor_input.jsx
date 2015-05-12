var VendorInput = React.createClass({
  mixins: [Formsy.Mixin, boldAutocompleteItem],
  getCreateNewAutocompleteItem: function() {
    return {
      name: "Create New Vendor",
      id: -1
    }
  },
  retrieveAutocompleteListAsync: function(term) {
    $.post("/vendors/searchEm", {search: {text: term || ""}}, function(result) {
      var vendors = result.vendors;
      if(vendors.length == 0) {
        vendors.push(this.getCreateNewAutocompleteItem());
      }
      this.setState({autocompleteList: vendors});
    }.bind(this));
  },
  addToForm: function(id, name) {
    this.setState({autocompleteSelectedValue: {id: id, name: name}});
    this.setValue(id);
  },

  // TODO: put in mixin?
  getInitialState: function() {
    return {
      autocompleteList: [],
      autocompleteSelectedValue: {id: -1, name: ''},
      autocompleteFormInputFocus: false
    };
  },
  componentDidMount: function() {
    this.setAutocompleteValueAsync();
  },

  setAutocompleteValueAsync: function() {
    var vendorId = this.getValue();
    if (vendorId) {
      $.get("/vendors/" + vendorId + ".json", function(result) {
        if (this.isMounted()) {
          this.setState({autocompleteSelectedValue: {id: result.vendor.id, name: result.vendor.name}});
        }
      }.bind(this));
    }
  },
  onClickToEdit: function() {
    this.setState({ autocompleteSelectedValue: { id: -2, name: ''}  });
    this.setState({ autocompleteFormInputFocus: true });
  },
  render: function() {
    return (
      <AutocompleteFormInput  name={this.props.name}
                              retrieveData={this.retrieveAutocompleteListAsync}
                              itemSelected={this.addToForm}
                              autocompleteSelectedValue={this.state.autocompleteSelectedValue}
                              autocompleteList={this.state.autocompleteList}
                              onClickToEdit={this.onClickToEdit}
                              label={'vendor'}
                              focus={this.state.autocompleteFormInputFocus} />
      );
  }
});

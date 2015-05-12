//TODO: rename to vendor_autocomplete_form_input
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
  onAutocompleteItemSelected: function(id, name) {
    this.setValue(id);
    this.setState({autocompleteSelectedValue: {id: id, name: name}});
  },
  setAutocompleteValueAsync: function(vendorId) {
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
  propTypes: {
    id: React.PropTypes.string,
    name: React.propTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.string
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
                              label={'vendor'}
                              focus={this.state.autocompleteFormInputFocus} />
      );
  }
});

var ContactTypeFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      itemName: null,
      itemDataArray: []
    };
  },
  setItem: function(id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({itemName: name});
      } else {
        this.setValue(null);
        this.setState({itemName: null});
      }
    }
    this.props.onChange(id);
  },
  contactTypesData: [{id: 1, name: 'Client'}, {id: 2, name: 'Vendor'}],
  search: function(term) {
    if (term == null) {
      term = '';
    }
    var newItemDataArray = [];
    this.contactTypesData.forEach(
      function(currentValue, index, array) {
        if (currentValue.name.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
          newItemDataArray.push(currentValue);
        }
      }
    );
    if (this.isMounted()) {
      this.setState({itemDataArray: newItemDataArray});
    }
  },
  retrieveItemAndSetItem: function(id) {
    this.contactTypesData.forEach(
      function(currentValue, index, array) {
        if (currentValue.id === id) {
          this.setItem(currentValue.id, currentValue.name);
        }
      }.bind(this)
    );
  },
  quickCreateItemAndSetItem: function(term) {
    //quick create not allowed for this control
  },
  render: function() {
    return (
      <FormInputAutocomplete id={this.props.id}
                             label={this.props.label}
                             name={this.props.name}
                             value={this.props.value}
                             itemDataArray={this.state.itemDataArray}
                             itemName={this.state.itemName}
                             setItem={this.setItem}
                             retrieveItemAndSetItem={this.retrieveItemAndSetItem}
                             retrieveAutocompleteData={this.search}
                             quickCreateItemAndSetItem={this.quickCreateItemAndSetItem}
        />
    );
  }
});

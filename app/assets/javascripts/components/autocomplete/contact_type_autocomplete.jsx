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
  render: function () {
    return (
      <Autocomplete id="contact_type"
                    name="contact_type"
                    label="Contact Type*"
                    retrieveData={this.retrieveContactTypes}
                    data={this.state.contactTypes}
                    placeholder="Select Contact Type..."
                    renderItem={this.renderItem}/>
    );
  }
});

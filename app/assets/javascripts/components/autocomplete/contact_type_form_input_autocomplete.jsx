var ContactTypeFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.number,
    onChange: React.PropTypes.func //gets called onChange
  },
  getInitialState: function () {
    return {
      isItemSelected: false,
      itemName: null,
      itemId: null,
      itemDataArray: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function () {
    var itemId = this.props.value || null;
    if (itemId) {
      this.retrieveItemAndSetItem(itemId);
    }
  },
  setItem: function (id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name, itemId: id});
        this.props.onChange(id);
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null, itemId: null});
      }
    }
  },
  clearItem: function () {
    this.setItem(null, null);
  },
  onAutocompleteItemSelected: function (e, item, term) {
    if (id === -1) {
      //quick create is not allowed for this control
      //this.quickCreateItem(term);
    }else {
      this.setItem(item.id, item.name);
    }
  },

  /* unique for contact_type START */
  contactTypesData: [{id: 1, name: 'Client'}, {id: 2, name: 'Vendor'}],

  searchByTerm: function (term) {
    if (term == null) {
      term = '';
    }
    var newItemDataArray = [];
    this.contactTypesData.forEach(
      function (currentValue, index, array) {
        if (currentValue.name.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
          newItemDataArray.push(currentValue);
        }
      }
    );
    if (this.isMounted()) {
      this.setState({itemDataArray: newItemDataArray});
    }
  },
  retrieveItemAndSetItem: function (id) {
    this.contactTypesData.forEach(
      function (currentValue, index, array) {
        if (currentValue.id === id) {
          this.setItem(currentValue.id, currentValue.name);
        }
      }.bind(this)
    );
  },
  quickCreateItem: function (term) {
    //quick create not allowed for this control
  },
  /* unique for contact_type END */

  render: function () {
    return (
      <FormInputAutocomplete id={this.props.id}
                             name={this.props.name}
                             label={this.props.label}
                             onSearchTermChangeCallback={this.searchByTerm}
                             retrieveItemAsyncAndSetItem={this.retrieveItemAndSetItem}
                             itemId={this.state.itemId}
                             itemName={this.state.itemName}
                             isItemSelected={this.state.isItemSelected}
                             autocompleteDataArray={this.state.itemDataArray}
                             itemSelectedCallback={this.onAutocompleteItemSelected}
                             clearItemCallback={this.clearItem}
        />
    );
  }
});

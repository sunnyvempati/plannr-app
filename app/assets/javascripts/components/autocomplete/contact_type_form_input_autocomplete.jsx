var ContactTypeFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      isItemSelected: false,
      itemName: null,
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
  onItemSelected: function (item, term) {
    if (item.id == -1) {
      this.quickCreateItemAndSetItem(term);
    }
    else {
      this.setItem(item.id, item.name);
    }
  },
  setItem: function (id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name});
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null});
      }
      this.props.onChange(id);
    }
  },
  onAutocompleteEditButtonClick: function () {
    var newState = this.getInitialState();
    newState.focus = true;
    if (this.isMounted()) {
      this.setState(newState);
    }
  },

  /* unique for contact_type START */
  contactTypesData: [{id: 1, name: 'Client'}, {id: 2, name: 'Vendor'}],
  retrieveItemAndSetItem: function (itemId) {
    this.retrieveVendorAsyncAndSetItem(itemId);
  },
  searchForAutocompleteData: function (term) {
    this.searchVendorsAsync(term);
  },

  //TODO: rename vendors
  searchVendorsAsync: function (term) {
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
  retrieveVendorAsyncAndSetItem: function (id) {
    this.contactTypesData.forEach(
      function (currentValue, index, array) {
        if (currentValue.id === id) {
          this.setItem(currentValue.id, currentValue.name);
        }
      }.bind(this)
    );
  },

  quickCreateItemAndSetItem: function (term) {
    //quick create not allowed for this control
  },
  /* unique for contact_type END */

  renderAutocomplete: function () {
    return (
      <Autocomplete id={this.props.id}
                    name={this.props.name}
                    retrieveData={this.searchForAutocompleteData}
                    itemSelected={this.onItemSelected}
                    data={this.state.itemDataArray}
                    focus={this.state.focus}
                    renderItem={this.renderItem}/>
    );
  },
  renderSelectedItem: function () {
    return (
      <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
        <div className="Autocomplete-pickedName">
          {this.state.itemName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },

  render: function () {
    var inputRender = this.state.isItemSelected ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

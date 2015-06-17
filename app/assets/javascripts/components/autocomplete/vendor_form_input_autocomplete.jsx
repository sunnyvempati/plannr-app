var VendorFormInputAutocomplete = React.createClass({
  mixins: [Formsy.Mixin, AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      isItemSelected: false,
      itemName: null,
      itemDataArray: []
    };
  },
  //componentDidMount: function() {
  //  var itemId = this.props.value || null;
  //  if (itemId) {
  //    this.retrieveItemAndSetItem(itemId);
  //  }
  //},
  //onItemSelected: function(item, term) {
  //  if (item.id == -1) {
  //    this.quickCreateItemAndSetItem(term, this.setItem);
  //  }
  //  else {
  //    this.setItem(item.id, item.name);
  //  }
  //},
  setItem: function(id, name) {
    if (this.isMounted()) {
      if (!!id && !!name) {
        this.setValue(id);
        this.setState({isItemSelected: true, itemName: name});
      } else {
        this.setValue(null);
        this.setState({isItemSelected: false, itemName: null});
      }
    }
  },
  //onAutocompleteEditButtonClick: function() {
  //  var newState = this.getInitialState();
  //  newState.focus = true;
  //  if (this.isMounted()) {
  //    this.setState(newState);
  //  }
  //},
  setItemDataArray: function(itemDataArray) {
    if (this.isMounted()) {
      this.setState({itemDataArray: itemDataArray});
    }
  },

  /* unique for vendor START */
  retrieveItemAndSetItem: function(itemId) {
    this.retrieveVendorAsyncAndSetItem(itemId);
  },
  searchForAutocompleteData: function(term) {
    this.searchVendorsAsync(term, this.setItemDataArray);
  },

  searchVendorsAsync: function(term, onSuccessCallback) {
    $.post("/vendors/search", {search: {text: term || ""}}, function(result) {
      var itemDataArray = result.vendors || [];
      if (itemDataArray.length == 0) {
        itemDataArray.push(this.getNewItem("vendor"));
      }
      onSuccessCallback(itemDataArray);
    }.bind(this));
  },
  retrieveVendorAsyncAndSetItem: function(id, onSuccessCallback) {
    $.get("/vendors/" + id + ".json", function(result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
      //this.setValue(item.id);
      //console.log('item.id');
      //console.log(item.id);
      //onSuccessCallback(item.id, item.name);
    }.bind(this));
  },
  quickCreateItemAndSetItem: function(term) {
    var payload = {vendor: {name: term}};
    $.post("/vendors.json", payload, function(result) {
      var item = result.vendor;
      this.setItem(item.id, item.name);
    }.bind(this))
  },
  /* unique for vendor END */

  //renderAutocomplete: function() {
  //  return (
  //    <Autocomplete id={this.props.id}
  //                  name={this.props.name}
  //                  retrieveData={this.searchForAutocompleteData}
  //                  itemSelected={this.onItemSelected}
  //                  data={this.state.itemDataArray}
  //                  focus={this.state.focus}
  //                  renderItem={this.renderItem}/>
  //  );
  //},
  //renderSelectedItem: function() {
  //  return (
  //    <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
  //      <div className="Autocomplete-pickedName">
  //        {this.state.itemName}
  //      </div>
  //      <div className="Autocomplete-edit">
  //        <i className="fa fa-pencil"></i>
  //      </div>
  //    </div>
  //  );
  //},

  render: function() {
    return (
      <FormInputAutocomplete id={this.props.id}
                             label={this.props.label}
                             name={this.props.name}
                             value={this.props.value}
                             itemDataArray={this.state.itemDataArray}
                             itemName={this.state.itemName}
                             isItemSelected={this.state.isItemSelected}
                             setItem={this.setItem}
                             retrieveItemAndSetItem={this.retrieveItemAndSetItem}
                             searchForAutocompleteData={this.searchForAutocompleteData}
                             quickCreateItemAndSetItem={this.quickCreateItemAndSetItem}
        />
    );
  }
});

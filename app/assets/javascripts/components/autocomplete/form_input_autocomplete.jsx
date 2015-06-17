var FormInputAutocomplete = React.createClass({
  mixins: [AutocompleteBoldItem, AutocompleteRenderNew],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,

    retrieveItemAndSetItem: React.PropTypes.func.isRequired,
    searchForAutocompleteData: React.PropTypes.func.isRequired,
    quickCreateItemAndSetItem: React.PropTypes.func.isRequired,
    itemDataArray: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var itemId = this.props.value || null;
    console.log('x itemId');
    console.log(itemId);
    if (itemId) {
      this.props.retrieveItemAndSetItem(itemId);
    }
  },
  onItemSelected: function(item, term) {
    console.log('onItemSelected - item');
    console.log(item);
    if (item.id == -1) {
      this.props.quickCreateItemAndSetItem(term);
    }
    else {
      this.props.setItem(item.id, item.name);
    }
  },
  //setItem: function(id, name) {
  //  if (this.isMounted()) {
  //    if (!!id && !!name) {
  //      //this.setValue(id);
  //      this.setState({isItemSelected: true, itemName: name});
  //    } else {
  //     //this.setValue(null);
  //     this.setState({isItemSelected: false, itemName: null});
  //    }
  //  }
  //},
  onAutocompleteEditButtonClick: function() {
    console.log('set focus true');
    if (this.isMounted()) {
      this.setState({focus: true});
    }
    this.props.setItem(null, null);
  },
  //setItemDataArray: function(itemDataArray) {
  //  if (this.isMounted()) {
  //    this.setState({itemDataArray: itemDataArray});
  //  }
  //},

  /* unique for vendor START */
  //retrieveItemAndSetItem: function(itemId) {
  //  this.retrieveVendorAsyncAndSetItem(itemId);
  //},
  //searchForAutocompleteData: function(term) {
  //  this.searchVendorsAsync(term, this.setItemDataArray);
  //},
  //
  //searchVendorsAsync: function(term, onSuccessCallback) {
  //  $.post("/vendors/search", {search: {text: term || ""}}, function(result) {
  //    var itemDataArray = result.vendors || [];
  //    onSuccessCallback(itemDataArray);
  //  }.bind(this));
  //},
  //retrieveVendorAsyncAndSetItem: function(id, onSuccessCallback) {
  //  $.get("/vendors/" + id + ".json", function(result) {
  //    var item = result.vendor;
  //    onSuccessCallback(item.id, item.name);
  //  }.bind(this));
  //},
  //quickCreateItemAndSetItem: function(term, onSuccessCallback) {
  //  var payload = {vendor: {name: term}};
  //  $.post("/vendors.json", payload, function(result) {
  //    var item = result.vendor;
  //    onSuccessCallback(item.id, item.name);
  //  }.bind(this))
  //},
  /* unique for vendor END */

  renderAutocomplete: function() {
    return (
      <Autocomplete id={this.props.id}
                    name={this.props.name}
                    retrieveData={this.props.searchForAutocompleteData}
                    itemSelected={this.onItemSelected}
                    data={this.props.itemDataArray}
                    focus={this.state.focus}/>
    );
  },
  renderSelectedItem: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
        <div className="Autocomplete-pickedName">
          {this.props.itemName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },

  render: function() {
    var inputRender = this.props.isItemSelected ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

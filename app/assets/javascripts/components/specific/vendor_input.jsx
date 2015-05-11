var VendorInput = React.createClass({
  mixins: [Formsy.Mixin, boldAutocompleteItem],
  //vendor specific
  getCreateNewAutocompleteItem: function() {
    return {
      name: "Create New Vendor",
      id: -1
    }
  },
  //vendor specific
  retrieveAutocompleteListAsync: function(term) {
    $.post("/vendors/searchEm", {search: {text: term || ""}}, function(result) {
      var vendors = result.vendors;
      if(vendors.length == 0) {
        vendors.push(this.getCreateNewAutocompleteItem());
      }
      this.setState({autocompleteList: vendors});
    }.bind(this));
  },

  addToForm: function(vendor, term) {
    if (vendor.id == this.getCreateNewAutocompleteItem().id) {
      var payload = {vendor: {name: term}};
      $.post("/vendors.json", payload, function(result) {
        this.setAutocompleteValue(result.vendor.id, result.vendor.name);
      }.bind(this))
    }
    else {
      this.setAutocompleteValue(vendor.id, vendor.name);
    }
  },
  setAutocompleteValue: function(id, name) {
    this.setValue(id);
    this.setState({autocompleteValueSelected: true, autocompleteSelectedName: name});
  },
  editAutocompleteValue: function() {
    this.setValue(this.getCreateNewAutocompleteItem().id);
    this.setState({autocompleteValueSelected: false, autocompleteSelectedName: null, autocompleteList: [], autocompleteFocus: true});
  },
  renderAutocompleteListItem: function(item, term) {
    var itemName = this.formatMatchedCharacters(item.name, term);
    var cx = React.addons.classSet;
    var itemClasses = cx({
      'Autocomplete-resultsItem': true,
      'u-italics': item.id == -1
    });
    return (
      <div className={itemClasses}
           dangerouslySetInnerHTML={{__html: itemName}}>
      </div>
    );
  },
  getInitialState: function() {
    return {
      autocompleteValueSelected: false,
      autocompleteSelectedName: null,
      autocompleteList: [],
      autocompleteFocus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    setAutocompleteValueAsync();
  },
  setAutocompleteValueAsync: function() {
    var vendorId = this.getValue();
    if (vendorId) {
      $.get("/vendors/" + vendorId + ".json", function(result) {
        if (this.isMounted()) {
          this.setAutocompleteValue(result.vendor.id, result.vendor.name);
        }
      }.bind(this));
    }
  },
  renderSelectedAutocompleteItem: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.editAutocompleteValue}>
        <div className="Autocomplete-pickedName">
          {this.state.autocompleteSelectedName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveAutocompleteListAsync}
                    itemSelected={this.addToForm}
                    data={this.state.autocompleteList}
                    focus={this.state.autocompleteFocus}
                    renderItem={this.renderAutocompleteListItem} />
    );
  },
  render: function() {
    var inputRender = this.state.autocompleteValueSelected ? this.renderSelectedAutocompleteItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

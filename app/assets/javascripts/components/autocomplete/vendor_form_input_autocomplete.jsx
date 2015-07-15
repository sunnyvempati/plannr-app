var VendorFormInputAutocomplete = React.createClass({
  mixins: [
    Formsy.Mixin,
    AutocompleteRenderNew,
    FormInputClassesMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      vendorSelected: false,
      vendorName: null,
      vendors: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var vendorValue = this.getValue();
    if (vendorValue) {
      $.get("/vendors/" + vendorValue + ".json", function(result) {
        if (this.isMounted()) {
          this.setState({vendorSelected: true, vendorName: result.vendor.name});
        }
      }.bind(this));
    }
  },
  retrieveVendors: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_search_limit: 5
      }
    };
    $.get("/vendors.json", params, function(result) {
      var vendors = result.vendors;
      if(vendors.length == 0) {
        vendors.push(this.getNewItem("vendor"));
      }
      this.setState({vendors: vendors});
    }.bind(this));
  },
  addToForm: function(vendor, term) {
    var vendor_id = 0, name = "";
    if (vendor.id == -1) {
      var payload = {contact: {name: term}};
      $.post("/vendors.json", payload, function(result) {
        this.setValue(result.contact.id);
        this.setState({vendorSelected: true, vendorNAme: result.vendor.name});
      }.bind(this))
    }
    else {
      this.setValue(vendor.id);
      this.setState({vendorSelected: true, vendorName: vendor.name});
    }
  },
  editVendor: function() {
    this.setState({vendorSelected: false, vendorName: null, vendors: [], focus: true});
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveVendors}
                    itemSelected={this.addToForm}
                    data={this.state.vendors}
                    focus={this.state.focus}
                    className={this.props.autocompleteClassName}
                    renderItem={this.renderItem} />
    );
  },
  renderSelectedVendor: function(className) {
    return (
      <div className={classNames(className)}>
        <div className="Autocomplete-picked" onClick={this.editVendor}>
          <div className="Autocomplete-pickedName">
            {this.state.vendorName}
          </div>
          <div className="Autocomplete-edit">
            <i className="fa fa-pencil"></i>
          </div>
        </div>
      </div>
    );
  },
  render: function() {
    var classes = this.getClassNames();
    var inputRender = this.state.vendorSelected ? this.renderSelectedVendor(classes.inputField) : this.renderAutocomplete();
    return (
      <div className={classNames(classes.inputContainer)}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

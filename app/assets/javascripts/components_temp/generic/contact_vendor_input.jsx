var ContactVendorInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  retrieveItem: function(id) {
    Utils.get('/vendors/' + id + '.json', {}, function(result) {
      if (this.isMounted()) {
        this.setState({itemSet: true, itemDisplay: result.vendor.name});
      }
    }.bind(this));
  },
  retrieveData: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_search_limit: 5
      }
    };
    Utils.get("/vendors.json", params, function(result) {
      var vendors = result.vendors;
      if(vendors.length == 0) {
        var newVendor = {name: "Create new vendor",id: -1};
        vendors = [newVendor]
      }
      this.setState({items: vendors});
    }.bind(this));
  },
  itemSelected: function(vendor, term) {
    if (vendor.id == -1) {
      var payload = {vendor: {name: term}};
      Utils.post("/vendors.json", payload, function(result) {
        this.setValue(result.vendor.id);
        this.setState({itemSet: true, itemDisplay: result.vendor.name});
      }.bind(this))
    }
    else {
      this.setValue(vendor.id);
      this.setState({itemSet: true, itemDisplay: vendor.name});
    }
  }
});

var VendorCards = {
  getInitialState: function() {
    return {
      vendor: null,
      contacts: null
    };
  },
  getDetails: function(id) {
    var url = '/vendors/'+id+'.json';
    $.get(url, function(result) {
      if(this.isMounted()) {
        this.setState({vendor: result.vendor});
      }
    }.bind(this))
  },
  renderVendorInfo: function(vendor) {
    var telHref = "tel:+1" + vendor.phone;
    return (
      <div className="Card">
        <div className="Card-title">
          Vendor Info
        </div>
        <div className="Card-content">
          <div className="IconWithText">
            <i className="fa fa-envelope CardIcon"></i>
            <a href={telHref}>{vendor.phone}</a>
          </div>
          <div className="IconWithText">
            <i className="fa fa-map-marker CardIcon"></i>
            {vendor.location}
          </div>
          <div className="IconWithText">
            <i className="fa fa-user CardIcon"></i>
            {vendor.primary_contact.name}
          </div>
        </div>
      </div>
    )
  },
  renderDescription: function(description) {
    return (
      <div className="Card">
        <div className="Card-title">Description</div>
        <div className="Card-content">
          {description}
        </div>
      </div>
    )
  }
}

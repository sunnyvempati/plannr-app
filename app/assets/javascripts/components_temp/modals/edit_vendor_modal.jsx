var EditVendorModal = React.createClass({
  mixins: [Modal],
  onSuccess: function(result) {
    var payload = {event_vendor: {vendor_id: result.vendor.id}};
    Utils.post("vendors", payload, function(result) {
      this.closeModal();
      this.props.onAssociation(result.event_vendor_with_vendor);
    }.bind(this))
  },
  renderModalContent: function() {
    return (
      <div className="EntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-truck"></i>
          </div>
          <div className="EntityModal-title">
            <h1>Create Vendor</h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <VendorForm
                onSuccess={this.onSuccess}
                authToken={this.props.authToken}
                routeVerb='POST'
                compact={true}
                onSecondaryClick={this.closeModal}
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

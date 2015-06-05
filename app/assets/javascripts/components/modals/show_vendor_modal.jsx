var ShowVendorModal = React.createClass({
  mixins: [Modal, VendorCards],
  componentDidMount: function() {
    this.getDetails(this.props.data.id);
  },
  renderModalContent: function() {
    var vendor = this.state.vendor;
    if (vendor) {
      var vendorHref = "/vendors/#/view/"+vendor.id;
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="EntityModal-title">
              <h1>
                <a href={vendorHref} target="_blank">
                  {this.props.data.name}
                </a>
              </h1>
            </div>
          </div>
          <div className="EntityModal-content">
            {this.renderVendorInfo(vendor)}
            {this.renderDescription(vendor.description)}
          </div>
        </div>
      )
    }
  }
});

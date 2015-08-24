import ModalMixin from '../mixins/ModalMixin';
import VendorCards from './VendorCards';
import EventVendorStore from '../../stores/EventVendorStore';

var ShowVendorModal = React.createClass({
  mixins: [ModalMixin, VendorCards],
  renderModalContent: function() {
    var vendor = EventVendorStore.getVendor(this.props.id);
    if (vendor) {
      var vendorHref = "/#/vendors/"+vendor.id;
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-truck"></i>
            </div>
            <div className="EntityModal-title">
              <h1>
                <a href={vendorHref} target="_blank">
                  {vendor.name}
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

export default ShowVendorModal;

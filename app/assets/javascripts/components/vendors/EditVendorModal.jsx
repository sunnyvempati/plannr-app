import ModalMixin from '../mixins/ModalMixin';
import VendorForm from './VendorForm';

var EditVendorModal = React.createClass({
  mixins: [ModalMixin],
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
                onSuccess={this.props.onSuccess}
                type='NEW'
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

export default EditVendorModal;

import ModalMixin from '../mixins/ModalMixin';
import ContactForm from './ContactForm';

var EditContactModal = React.createClass({
  mixins: [ModalMixin],
  renderModalContent: function() {
    return (
      <div className="EntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-user"></i>
          </div>
          <div className="EntityModal-title">
            <h1>Edit Contact</h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <ContactForm
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

export default EditContactModal;

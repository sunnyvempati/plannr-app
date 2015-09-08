import ModalMixin from '../mixins/ModalMixin';
import PaymentForm from './PaymentForm';

const EditPaymentModal = React.createClass({
  mixins: [ModalMixin],
  renderModalContent: function() {
    return (
      <div className="EntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-money"></i>
          </div>
          <div className="EntityModal-title u-wrapWithEllipsis">
            <h3>{this.props.expense.name + " Payment"}</h3>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <PaymentForm
                onSuccess={this.closeModal}
                type={this.props.type}
                compact={true}
                onSecondaryClick={this.closeModal}
                expense={this.props.expense}
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default EditPaymentModal;

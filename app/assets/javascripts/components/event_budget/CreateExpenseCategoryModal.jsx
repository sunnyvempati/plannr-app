import ModalMixin from '../mixins/ModalMixin';
import ExpenseCategoryForm from './ExpenseCategoryForm';

const EditPaymentModal = React.createClass({
  mixins: [ModalMixin],
  onSuccess(result) {
    this.closeModal();
    this.props.onSuccess(result);
  },
  componentDidMount: function() {

  },
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
              <ExpenseCategoryForm
                onSuccess={this.onSuccess}
                type="NEW"
                inModal={true}
                onSecondaryClick={this.closeModal}
                eventId={this.props.eventId}
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default EditPaymentModal;

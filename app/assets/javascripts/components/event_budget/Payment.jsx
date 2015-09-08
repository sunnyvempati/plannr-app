import CheckboxInput from '../generic/CheckboxInput';
import ReactIntl from 'react-intl';
import DropdownMenu from '../generic/DropdownMenu';
import ExpenseStore from '../../stores/ExpenseStore';
import PaymentStore from '../../stores/PaymentStore';
import ModalActions from '../../actions/ModalActions';
import PaymentActions from '../../actions/PaymentActions';
import PaymentTypes from './PaymentTypes';
import moment from 'moment';

var Payment = React.createClass({
  actionItems() {
    return [
      {name: "Edit", handler: this.handleEdit},
      {name: "Delete", handler: this.handleDelete}
    ];
  },
  getRowActionMenu() {
    var globalItems = this.actionItems().map((item) => {
      return (
        <div className="DropdownMenu-item"
             onClick={this.handleActionClick.bind(this, item)}
             key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    return (
      <div className="TableRow-actions">
        {globalItems}
      </div>
    )
  },
  handleActionClick(item) {
    item.handler(this.props.data.id);
  },
  getActionTrigger() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v PaymentActionIcon"></i>
      </div>
    )
  },
  handleEdit(id) {
    var props = {
      model: PaymentStore.get(id),
      expense: this.props.expense,
      type: 'OLD'
    }
    ModalActions.openEditPaymentModal(props);
  },
  handleDelete(id) {
    PaymentActions.delete(id, this.props.expense.id);
  },
  paidChanged(checked, id) {
    let params = {payment: {}};
    if (checked) params.payment.paid_date = moment().format();
    else params.payment.paid_date = null;
    PaymentActions.update(id, this.props.expense.id, params);
  },
  render() {
    let p = this.props.data;
    return (
      <div className="Payment">
        <div className="Payment-check">
          <CheckboxInput onChange={this.paidChanged}
                         value={p.id}
                         checked={!!p.paid_date}
                         rounded={true} />
        </div>
        <div className="Payment-details">
          <div className="Info">
            <div className="Display">Due</div>
            <div className="Content">{p.due_date}</div>
          </div>
          <div className="Info">
            <div className="Display">Paid</div>
            <div className="Content">{p.paid_date}</div>
          </div>
          <div className="Info">
            <div className="Display">Amount</div>
            <div className="Content">{p.amount}</div>
          </div>
          <div className="Info">
            <div className="Display">Type</div>
            <div className="Content">{PaymentTypes.getPaymentDisplay(p.payment_method)}</div>
          </div>
        </div>
        <div className="Payment-actions">
          <DropdownMenu trigger={this.getActionTrigger()}
                        customOptions={this.getRowActionMenu()}
                        align="right" />
        </div>
      </div>
    );
  }
});

export default Payment;

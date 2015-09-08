import DropdownMenu from '../generic/DropdownMenu';
import ReactIntl from 'react-intl';
import CheckboxInput from '../generic/CheckboxInput';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import PaymentStore from '../../stores/PaymentStore';

var ExpenseRow = React.createClass({
  paymentTypes: {
    1: "Credit",
    2: "Debit",
    3: "Check"
  },
  actionItems() {
    return [
      {name: "Edit", handler: this.handleEdit},
      {name: "Delete", handler: this.handleDelete},
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
  getActionTrigger() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  handleActionClick(item) {
    item.handler(this.props.data.id);
  },
  handleDelete(id) {
    ExpenseActions.delete(id);
  },
  handleEdit(id) {
    let props = {
      id: this.props.eventId,
      expense_id: id
    };
    RouteActions.redirect('expense_form_edit', props);
  },
  paidChanged(id) {
    // to do
    console.log(id + " changed");
  },
  goToExpense() {
    RouteActions.redirect('expense', {id: this.props.eventId, expense_id: this.props.data.id});
  },
  renderPayments(payments) {
    if (payments.length) {
      return payments.map((p) => {
        let payment = PaymentStore.get(p.id);
        let date = payment.paid_date ? payment.paid_date : payment.due_date;
        return (
          <div className="ExpenseRow-payment" key={payment.id}>
            <div className="checkbox">
              <CheckboxInput onChange={this.paidChanged}
                             value={payment.id}
                             checked={!!payment.paid_date} />
            </div>
            <div className="status">
              {payment.paid_date ? "Paid" : "Due"}
            </div>
            <div className="details">
              <div className="date">
                <ReactIntl.FormattedDate
                  day="numeric"
                  month="numeric"
                  year="numeric"
                  value={date} />
              </div>
              <div className="amount">
                <ReactIntl.FormattedNumber value={payment.amount} style="currency" currency="USD" />
              </div>
              <div className="method">{payment.type_display}</div>
            </div>
          </div>
        )
      });
    } else {
      return (
        <div className="u-italics u-dim">None Scheduled</div>
      )
    }
  },
  render: function() {
    let expense = this.props.data;
    let paidTotal = 0, payments = expense.payments;
    payments.forEach((p) => {
      if (!!p.paid_date) paidTotal += p.amount;
    });
    let unpaidTotal = expense.total - paidTotal;
    return (
      <div className="Table-row ExpenseRow">
        <div className="ExpenseRow-item u-flexGrow-5 u-clickable" onClick={this.goToExpense}>
          <div className="ExpenseRow-title">
            <div className="name">{expense.name}</div>
            <div className="vendor">{expense.event_vendor_name}</div>
          </div>
        </div>
        <div className="ExpenseRow-item u-flexGrow-8">
          {expense.notes}
        </div>
        <div className="ExpenseRow-item u-flexGrow-2">
          <div className="ExpenseRow-cost">
            <ReactIntl.FormattedNumber value={expense.price} style="currency" currency="USD" />
            <div className="quantity">x {expense.quantity}</div>
          </div>
        </div>
        <div className="ExpenseRow-item u-flexGrow-2">
          <div className="ExpenseRow-paid">
            <div className="total">
              <ReactIntl.FormattedNumber value={expense.total} style="currency" currency="USD" />
            </div>
            <div className="paid">
              - <ReactIntl.FormattedNumber value={paidTotal} style="currency" currency="USD" />
            </div>
            <div className="leftOver">
              <ReactIntl.FormattedNumber value={unpaidTotal} style="currency" currency="USD" />
            </div>
          </div>
        </div>
        <div className="ExpenseRow-item u-flexGrow-4">
          {this.renderPayments(payments)}
        </div>
        <DropdownMenu trigger={this.getActionTrigger()}
                      customOptions={this.getRowActionMenu()}
                      align="right" />
      </div>
    );
  }
});

export default ExpenseRow;

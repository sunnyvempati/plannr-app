import DropdownMenu from '../generic/DropdownMenu';
import ReactIntl from 'react-intl';
import CheckboxInput from '../generic/CheckboxInput';

var ExpenseRow = React.createClass({
  paymentTypes: {
    1: "Credit",
    2: "Debit",
    3: "Check"
  },
  getRowActionMenu() {
    return [];
  },
  getActionTrigger() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  paidChanged(id) {
    // to do
    console.log(id + " changed");
  },
  renderPayments(payments) {
    if (payments.length) {
      return payments.map((p) => {
        return (
          <div className="ExpenseRow-payment" key={p.id}>
            <div className="checkbox">
              <CheckboxInput onChange={this.paidChanged}
                             value={p.id}
                             checked={p.paid} />
            </div>
            <div className="status">
              {p.paid ? "Paid" : "Due"}
            </div>
            <div className="details">
              <div className="date">
                <ReactIntl.FormattedDate
                  day="numeric"
                  month="numeric"
                  year="numeric"
                  value={p.due_date} />
              </div>
              <div className="amount">
                <ReactIntl.FormattedNumber value={p.amount} style="currency" currency="USD" />
              </div>
              <div className="method">{this.paymentTypes[p.method]}</div>
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
      if (p.paid) paidTotal += p.amount;
    });
    let unpaidTotal = expense.total - paidTotal;
    return (
      <div className="Table-row ExpenseRow">
        <div className="ExpenseRow-item u-flexGrow-5 u-clickable">
          <div className="ExpenseRow-title">
            <div className="name">{expense.name}</div>
            <div className="vendor">{expense.vendor_name}</div>
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

import ExpenseStore from '../../stores/ExpenseStore';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import Button from '../generic/Button';
import ReactIntl from 'react-intl';

var Expense = React.createClass({
  getExpenseState() {
    return {
      expense: ExpenseStore.get(this.props.params.expense_id) || null
    }
  },
  getInitialState: function() {
    return this.getExpenseState();
  },
  componentDidMount() {
    ExpenseStore.addChangeListener(this._onChange);
    if (!this.state.expense) ExpenseActions.get(this.props.params.expense_id);
  },
  componentWillUnmount() {
    ExpenseStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(this.getExpenseState());
  },
  renderPayments(payments) {
    if (payments.length) {

    }
  },
  goToEditExpense() {
    // to do
  },
  render: function() {
    let expense = this.state.expense || {};
    let paidTotal = 0, payments = expense.payments || [];
    payments.forEach((p) => {
      if (p.paid) paidTotal += p.amount;
    });
    let remaining = expense.total - paidTotal;
    return (
      <div className="ExpenseContainer">
        <div className="ExpenseDetails">
          <div className="ExpenseCard">
            <div className="Header">Expense</div>
            <div className="Info">
              <div className="Display">Expense</div>
              <div className="Content">{expense.name}</div>
            </div>
            <div className="Info">
              <div className="Display">Category</div>
              <div className="Content">{expense.event_expense_category_name}</div>
            </div>
            <div className="Info">
              <div className="Display">Vendor</div>
              <div className="Content">{expense.event_vendor_name}</div>
            </div>
            <div className="Info">
              <div className="Display">Notes</div>
              <div className="Content">{expense.notes}</div>
            </div>
          </div>
          <div className="ExpenseCard">
            <div className="Header">
              <div className="Name">Cost</div>
              <div className="Total">
                <div className="Display">Total</div>
                <div className="Content">
                  <ReactIntl.FormattedNumber value={expense.total} style="currency" currency="USD" />
                </div>
              </div>
            </div>
            <div className="Info">
              <div className="Display">Price</div>
              <div className="Content">
                <ReactIntl.FormattedNumber value={expense.price} style="currency" currency="USD" />
              </div>
            </div>
            <div className="Info">
              <div className="Display">Quantity</div>
              <div className="Content">{expense.quantity}</div>
            </div>
          </div>
          <div className="ExpenseCard">
            <div className="Header">
              <div className="Name">Payments</div>
              <div className="Total">
                <div className="Display">Remaining</div>
                <div className="Content">
                  <ReactIntl.FormattedNumber value={remaining} style="currency" currency="USD" />
                </div>
              </div>
            </div>
            <div className="Info">
              {this.renderPayments(expense.payments)}
            </div>
          </div>
        </div>
        <div className="ExpenseActions">
          <Button type="button" onClick={this.goToEditExpense} className="Button--primary">Edit
          </Button>
        </div>
      </div>
    );
  }
});

export default Expense;

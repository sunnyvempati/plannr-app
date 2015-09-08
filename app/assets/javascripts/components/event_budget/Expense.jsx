import ExpenseStore from '../../stores/ExpenseStore';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import ModalActions from '../../actions/ModalActions';
import Button from '../generic/Button';
import CheckboxInput from '../generic/CheckboxInput';
import ReactIntl from 'react-intl';
import Payment from './Payment';
import EditPaymentModal from './EditPaymentModal';
import PaymentStore from '../../stores/PaymentStore';

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
  handleAddPayment() {
    var props = {
      model: {},
      expense: this.state.expense,
      type: 'NEW'
    }
    ModalActions.openEditPaymentModal(props);
  },
  paidChanged() {

  },
  renderPayments(payments) {
    if (payments && payments.length) {
      return payments.map((p) => {
        return (
          <Payment data={PaymentStore.get(p.id)} expense={this.state.expense} key={p.id} />
        )
      });
    }
  },
  goToEditExpense() {
    let props = {
      id: this.props.eventId,
      expense_id: this.state.expense && this.state.expense.id
    };
    RouteActions.redirect('expense_form_edit', props);
  },
  render: function() {
    let expense = this.state.expense || {};
    let paidTotal = 0, payments = expense.payments || [];
    payments.forEach((p) => {
      let payment = PaymentStore.get(p.id);
      if (!!payment.paid_date) paidTotal += payment.amount;
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
            <div className="Action u-clickable" onClick={this.handleAddPayment}>
              <i className="fa fa-plus"></i>
              Add Payment
            </div>
            {this.renderPayments(expense.payments)}
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

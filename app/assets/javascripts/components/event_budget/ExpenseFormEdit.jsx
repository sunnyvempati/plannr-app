import ExpenseForm from './ExpenseForm';
import ExpenseStore from '../../stores/ExpenseStore';
import ExpenseActions from '../../actions/ExpenseActions';

var ExpenseFormEdit = React.createClass({
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
  render() {
    return (
      <ExpenseForm model={this.state.expense}
                   type="OLD"
                   eventId={this.props.eventId} />
    );
  }
});

export default ExpenseFormEdit;

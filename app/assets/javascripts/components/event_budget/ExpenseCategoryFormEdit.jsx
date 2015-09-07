import ExpenseCategoryForm from './ExpenseCategoryForm';
import EventExpenseCategoryStore from '../../stores/EventExpenseCategoryStore';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';

var ExpenseCategoryFormEdit = React.createClass({
  getEventExpenseCategoryState() {
    return {
      expenseCategory: EventExpenseCategoryStore.get(this.props.params.budget_category_id) || null
    }
  },
  getInitialState: function() {
    return this.getEventExpenseCategoryState();
  },
  componentDidMount() {
    EventExpenseCategoryStore.addChangeListener(this._onChange);
    console.log(this.state.expenseCategory);
    if (!this.state.expenseCategory) EventExpenseCategoryActions.get(this.props.params.budget_category_id);
  },
  componentWillUnmount() {
    EventExpenseCategoryStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(this.getEventExpenseCategoryState());
  },
  render() {
    return (
      <ExpenseCategoryForm model={this.state.expenseCategory}
                           type="OLD"
                           eventId={this.props.eventId} />
    );
  }
});

export default ExpenseCategoryFormEdit;

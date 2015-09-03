import DropdownMenu from '../generic/DropdownMenu';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import ExpenseStore from '../../stores/ExpenseStore';

var EventBudgetList = React.createClass({
  componentDidMount() {
    ExpenseStore.addChangeListener(this._onExpenseChange);
    this.setExpenses();
  },
  componentWillUnmount() {
    ExpenseStore.removeChangeListener(this._onExpenseChange);
  },
  _onExpenseChange() {
    this.setExpenses();
  },
  setExpenses() {
    let params = {event_id: this.props.params.id}
    let expenses = ExpenseStore.getFromCache(params);
    if (expenses) this.setState({data: expenses});
    else ExpenseActions.getExpenses(params);
  },
  goToAddExpense() {
    console.log("add expense");
  },
  goToAddCategory() {
    console.log("add category");
  },
  getAddNewTrigger() {
    return (
      <div className="SideBarIconWithName">
        <i className="fa fa-plus Nav-icon"></i>
        <div className="Nav-name">Add New</div>
      </div>
    )
  },
  getAddNewItems() {
    return [
      {name: "Category", handler: this.goToAddCategory},
      {name: "Expense", handler: this.goToAddExpense}
    ]
  },
  render: function() {
    return (
      <div className="EventTableContainer">
        <div className="Table-sidebarContainer">
          <DropdownMenu trigger={this.getAddNewTrigger()}
                        items={this.getAddNewItems()} />
        </div>
        Budget Table
      </div>
    );
  }
});

export default EventBudgetList;

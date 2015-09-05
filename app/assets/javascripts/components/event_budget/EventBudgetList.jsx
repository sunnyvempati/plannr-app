import DropdownMenu from '../generic/DropdownMenu';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';
import ExpenseStore from '../../stores/ExpenseStore';
import EventExpenseCategoryStore from '../../stores/EventExpenseCategoryStore';

var EventBudgetList = React.createClass({
  getInitialState: function() {
    return {
      expenses: [],
      categories: []
    };
  },
  componentDidMount() {
    ExpenseStore.addChangeListener(this._onExpenseChange);
    EventExpenseCategoryStore.addChangeListener(this._onCategoryChange);
    this.setCategories();
    this.setExpenses();
  },
  componentWillUnmount() {
    ExpenseStore.removeChangeListener(this._onExpenseChange);
    EventExpenseCategoryStore.removeChangeListener(this._onCategoryChange)
  },
  _onExpenseChange() {
    this.setExpenses();
  },
  _onCategoryChange() {
    this.setCategories();
  },
  setExpenses() {
    let params = {event_id: this.props.params.id}
    let expenses = ExpenseStore.getFromCache(params);
    if (expenses) this.setState({data: expenses});
    else ExpenseActions.getExpenses(params);
  },
  setCategories() {
    let params = {event_id: this.props.params.id}
    let categories = EventExpenseCategoryStore.getFromCache(params);
    if (categories) this.setState({categories: categories});
    else EventExpenseCategoryActions.getEventExpenseCategories(params);
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
  renderCategoryRows() {
    let categories = this.state.categories;
    if (categories.length) {
      return categories.map((category) => {
        return (
          <div key={category.id} className="BudgetList-row">
            <div className="Category-row">
              <div className="Category-name">
                {category.expense_category_name}
              </div>
            </div>
            <div className="Category-expenses">
             asdfasfdasf
            </div>
          </div>
        )
      });
    }
  },
  render: function() {
    return (
      <div className="EventTableContainer">
        <div className="Table-sidebarContainer">
          <DropdownMenu trigger={this.getAddNewTrigger()}
                        items={this.getAddNewItems()} />
        </div>
        <div className="BudgetListContainer">
          {this.renderCategoryRows()}
        </div>
      </div>
    );
  }
});

export default EventBudgetList;

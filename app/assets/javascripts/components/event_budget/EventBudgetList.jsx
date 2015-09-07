import DropdownMenu from '../generic/DropdownMenu';
import RouteActions from '../../actions/RouteActions';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';
import EventExpenseCategoryStore from '../../stores/EventExpenseCategoryStore';
import CategoryRow from './CategoryRow';

var EventBudgetList = React.createClass({
  getInitialState: function() {
    return {
      categories: []
    };
  },
  componentDidMount() {
    EventExpenseCategoryStore.addChangeListener(this._onCategoryChange);
    this.setCategories();
  },
  componentWillUnmount() {
    EventExpenseCategoryStore.removeChangeListener(this._onCategoryChange)
  },
  _onCategoryChange() {
    this.setCategories();
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
            <CategoryRow category={category} />
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

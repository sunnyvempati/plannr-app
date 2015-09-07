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
    let params = {with_event_id: this.props.eventId, sorted_by: 'expense_category_name_asc'};
    let categories = EventExpenseCategoryStore.getFromCache(params);
    if (categories) this.setState({categories: categories});
    else EventExpenseCategoryActions.getEventExpenseCategories(params);
  },
  renderCategoryRows() {
    let categories = this.state.categories;
    if (categories.length) {
      return categories.map((category) => {
        return (
          <div key={category.id} className="BudgetList-row">
            <CategoryRow category={category} eventId={this.props.eventId} />
          </div>
        )
      });
    }
  },
  render: function() {
    return (
      <div className="BudgetListContainer">
        {this.renderCategoryRows()}
      </div>
    );
  }
});

export default EventBudgetList;

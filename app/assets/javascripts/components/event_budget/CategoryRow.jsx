import ExpenseStore from '../../stores/ExpenseStore';
import ExpenseActions from '../../actions/ExpenseActions';
import RouteActions from '../../actions/RouteActions';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';
import ExpenseList from './ExpenseList';
import DropdownMenu from '../generic/DropdownMenu';
import ReactIntl from 'react-intl';
import classNames from 'classnames';

var CategoryRow = React.createClass({
  getInitialState: function() {
    return {
      expenses: [],
      collapse: true
    };
  },
  componentDidMount: function() {
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
    let params = {
      with_event_expense_category_id: this.props.category.id
    };
    let expenses = ExpenseStore.getFromCache(params);
    if (expenses) this.setState({expenses: expenses});
    else ExpenseActions.getExpenses(params);
  },
  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  },
  goToAddExpense() {
    console.log("Go to add expense");
  },
  getExpenseTotal() {
    let expenses = this.state.expenses, total=0;
    if (expenses.length) expenses.forEach((e) => total += e.total);
    return total;
  },
  getActionTrigger() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v CategoryIcon"></i>
      </div>
    )
  },
  handleActionClick(item) {
    item.handler(this.props.category.id);
  },
  handleEdit(id) {
    let props = {id: this.props.eventId, budget_category_id: id};
    RouteActions.redirect('expense_category_form_edit', props);
  },
  handleRemove(id) {
    EventExpenseCategoryActions.remove(id);
  },
  actionItems() {
    let items = [{name: "Edit", handler: this.handleEdit}];
    if (!this.state.expenses.length) items.push({name: "Remove", handler: this.handleRemove});
    return items;
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
  render: function() {
    let category = this.props.category;
    let expenseClasses = classNames({
      'Category-expenses': true,
      'u-hidden': this.state.collapse
    });
    let iconClasses = classNames({
      'CategoryIcon': true,
      'fa fa-plus-square-o': this.state.collapse,
      'fa fa-minus-square-o': !this.state.collapse,
    });
    let expenseTotal = this.getExpenseTotal();
    let remainingTotal = category.budget - expenseTotal;
    return (
      <div>
        <div className="Category-header">
          <div className="Category-toggleExpense u-clickable" onClick={this.toggleCollapse}>
            <i className={iconClasses}></i>
          </div>
          <div className="Category-name u-wrapWithEllipsis">
            {category.expense_category_name}
          </div>
          <div className="Category-estimated">
            <div className="display">Estimated</div>
            <div className="price">
              <ReactIntl.FormattedNumber value={category.budget} style="currency" currency="USD" />
            </div>
          </div>
          <div className="Category-expenses">
            <div className="display">Expenses</div>
            <div className="price">
              <ReactIntl.FormattedNumber value={expenseTotal} style="currency" currency="USD" />
            </div>
          </div>
          <div className="Category-remaining">
            <div className="display">Remaining</div>
            <div className="price">
              <ReactIntl.FormattedNumber value={remainingTotal} style="currency" currency="USD" />
            </div>
          </div>
          <DropdownMenu trigger={this.getActionTrigger()}
                        customOptions={this.getRowActionMenu()}
                        align="right" />
        </div>
        <div className={expenseClasses}>
          <ExpenseList data={this.state.expenses} />
        </div>
        <div className="Category-addExpense u-clickable" onClick={this.goToAddExpense}>
          <i className="fa fa-plus"></i>
          <div className="display">Add Expense</div>
        </div>
      </div>
    );
  }
});

export default CategoryRow;

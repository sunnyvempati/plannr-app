import {RouteHandler} from 'react-router';
import RouteActions from '../../actions/RouteActions';
import DropdownMenu from '../generic/DropdownMenu';

var EventBudget = React.createClass({
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
  goToAddExpense() {
    console.log("add expense");
  },
  goToAddCategory() {
    let props = {id: this.props.params.id};
    RouteActions.redirect('expense_category_form_new', props);
  },
  render: function() {
    return (
      <div className="EventTableContainer">
        <div className="Table-sidebarContainer">
          <DropdownMenu trigger={this.getAddNewTrigger()}
                        items={this.getAddNewItems()} />
        </div>
        <RouteHandler eventId={this.props.params.id} />
      </div>
    );
  }
});

export default EventBudget;

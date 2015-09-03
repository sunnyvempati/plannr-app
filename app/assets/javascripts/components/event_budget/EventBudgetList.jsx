import DropdownMenu from '../generic/DropdownMenu';

var EventBudgetList = React.createClass({
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

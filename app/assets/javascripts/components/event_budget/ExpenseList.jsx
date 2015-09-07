import Table from '../generic/Table';
import ExpenseRow from './ExpenseRow';

var ExpenseList = React.createClass({
  getColumns() {
    return [
      {name: "name", grow: 5, header: "Expense / Vendor"},
      {name: "notes", grow: 8, header: "Notes"},
      {name: "cost", grow: 2, header: "Cost"},
      {name: "total", grow: 2, header: "Total"},
      {name: "payments", grow: 4, header: "Payments"}
    ];
  },
  goToExpense() {
    // to do
    console.log("go to expense");
  },
  getCustomRows() {
    let expenses = this.props.data;
    if (expenses) {
      return expenses.map((expense) => {
        return (
          <ExpenseRow key={expense.id} data={expense} />
        );
      });
    }
  },
  render() {
    return (
      <Table
        tableDataClassName="ExpenseData"
        columns={this.getColumns()}
        showHeaders={true}
        showToolbar={false}
        useCustomRowComponent={true}
        customRows={this.getCustomRows()}
        extraPadding={false}
        hideHeaderCheckbox={true}
        onClick={this.goToExpense}
      />
    );
  }
});

export default ExpenseList;

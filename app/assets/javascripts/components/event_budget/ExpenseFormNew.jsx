import ExpenseForm from './ExpenseForm';

var ExpenseFormNew = React.createClass({
  render: function() {
    let model = {
      event_expense_category_id: this.props.query.category_id
    };
    return (
      <ExpenseForm model={model} type="NEW" eventId={this.props.eventId} />
    );
  }
});

export default ExpenseFormNew;

import ExpenseCategoryForm from './ExpenseCategoryForm';

class ExpenseCategoryFormNew extends React.Component {
  render() {
    return (
      <ExpenseCategoryForm model={{}} type="NEW" eventId={this.props.eventId} />
    );
  }
}

export default ExpenseCategoryFormNew;

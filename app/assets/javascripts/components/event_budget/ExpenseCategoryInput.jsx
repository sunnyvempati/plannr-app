import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';
import EventExpenseCategoryStore from '../../stores/EventExpenseCategoryStore';

var ExpenseCategoryInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    EventExpenseCategoryStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    EventExpenseCategoryStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    let id = this.getValue();
    let itemFound = !!id && EventExpenseCategoryStore.get(id);
    this.setState({
      items: EventExpenseCategoryStore.searchResults,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.expense_category_name
    });
  },
  retrieveItem(id) {
    let category = EventExpenseCategoryStore.get(id);
    if (category) {
      this.setState({itemSet: true, itemDisplay: category.expense_category_name});
    } else EventExpenseCategoryActions.get(id);
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_event_id: this.props.eventId,
      with_search_limit: 5
    };
    EventExpenseCategoryActions.search(params);
  },
  itemSelected: function(category, term) {
    this.setValue(category.id);
    this.setState({itemSet: true, itemDisplay: category.expense_category_name});
  }
});

export default ExpenseCategoryInput;

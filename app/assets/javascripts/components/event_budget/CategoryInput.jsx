import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import ExpenseCategoryActions from '../../actions/ExpenseCategoryActions';
import ExpenseCategoryStore from '../../stores/ExpenseCategoryStore';
import AutocompleteCreateStore from '../../stores/AutocompleteCreateStore';

var CategoryInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    ExpenseCategoryStore.addChangeListener(this._onSearchChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateCategory);
  },
  componentWillUnmount() {
    ExpenseCategoryStore.removeChangeListener(this._onSearchChange);
    AutocompleteCreateStore.addChangeListener(this._onCreateCategory);
  },
  _onSearchChange() {
    let returnedCategories = ExpenseCategoryStore.searchResults;
    if (!returnedCategories.length) returnedCategories.push({name: 'Create new budget category', id: -1});
    let id = this.getValue();
    let itemFound = !!id && ExpenseCategoryStore.get(id);
    this.setState({
      items: returnedCategories,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  _onCreateCategory() {
    if (!AutocompleteCreateStore.errors) {
      let entity = AutocompleteCreateStore.entity;
      let expenseCategoryName = entity && entity.name;
      this.setValue(entity && entity.id);
      if (expenseCategoryName) this.setState({itemSet: true, itemDisplay: expenseCategoryName});
    }
  },
  retrieveItem(id) {
    let category = ExpenseCategoryStore.get(id);
    if (category) {
      this.setState({itemSet: true, itemDisplay: category.name});
    } else ExpenseCategoryActions.get(id);
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      not_in_event_id: this.props.eventId,
      with_search_limit: 5
    };
    ExpenseCategoryActions.search(params);
  },
  itemSelected: function(category, term) {
    let itemSet = false, itemDisplay = "";
    if (category.id == -1) {
      var payload = {expense_category: {name: term}};
      ExpenseCategoryActions.create(payload);
    }
    else {
      this.setValue(category.id);
      this.setState({itemSet: true, itemDisplay: category.name});
    }
  }
});

export default CategoryInput;

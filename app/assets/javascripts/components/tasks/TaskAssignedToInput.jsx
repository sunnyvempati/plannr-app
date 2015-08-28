import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';

var TaskAssignedToInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    let id = this.getValue();
    let itemFound = !!id && UserStore.get(id);
    this.setState({
      items: UserStore.searchResults,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  retrieveItem: function(id) {
    let item = UserStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else UserActions.get(id);
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    UserActions.search(params);
  },
  itemSelected: function(user) {
    this.setValue(user.id);
    this.setState({itemSet: true, itemDisplay: user.name});
  }
});

export default TaskAssignedToInput;

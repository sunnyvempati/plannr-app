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
    this.setState({items: UserStore.searchResults});
  },
  retrieveItem: function(id) {
    // to do
    // Utils.get('/users/' + id + '.json', {}, function(result) {
    //   if (this.isMounted()) {
    //     this.setState({itemSet: true, itemDisplay: result.user.name});
    //   }
    // }.bind(this));
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

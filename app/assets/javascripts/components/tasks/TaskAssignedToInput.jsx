import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';

var TaskAssignedToInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
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
    // to do
    // Utils.get("/users.json", params, function(result) {
    //   this.setState({items: result.users});
    // }.bind(this));
  },
  itemSelected: function(user) {
    this.setValue(user.id);
    this.setState({itemSet: true, itemDisplay: user.name});
  }
});

export default TaskAssignedToInput;

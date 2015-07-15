var TaskAssignedToInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  retrieveItem: function(id) {
    Utils.get('/users/' + id + '.json', {}, function(result) {
      this.setState({itemSet: true, itemDisplay: result.user.name});
    }.bind(this));
  },
  retrieveData: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_search_limit: 5
      }
    };
    Utils.get("/users.json", params, function(result) {
      this.setState({items: result.users});
    }.bind(this));
  },
  itemSelected: function(user) {
    this.setValue(user.id);
    this.setState({itemSet: true, itemDisplay: user.name});
  }
});

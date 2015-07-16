var TaskEventInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  retrieveItem: function(id) {
    Utils.get('/events/' + id + '.json', {}, function(result) {
      this.setState({itemSet: true, itemDisplay: result.event.name});
    }.bind(this));
  },
  retrieveData: function(term) {
    var params = {
      filter_sort: {
        search_query: term,
        with_search_limit: 5
      }
    };
    Utils.get("/events.json", params, function(result) {
      this.setState({items: result.events});
    }.bind(this));
  },
  itemSelected: function(item) {
    this.setValue(item.id);
    this.setState({itemSet: true, itemDisplay: item.name});
  }
});

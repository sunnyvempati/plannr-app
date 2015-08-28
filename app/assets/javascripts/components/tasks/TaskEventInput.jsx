import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import EventStore from '../../stores/EventStore';
import EventActions from '../../actions/EventActions';

var TaskEventInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  },
  retrieveItem: function(id) {
    let item = EventStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else EventActions.get(id);
  },
  _onChange() {
    let id = this.getValue();
    let itemFound = !!id && EventStore.get(id);
    this.setState({
      items: EventStore.searchResults,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    EventActions.search(params);
  },
  itemSelected: function(item) {
    this.setValue(item.id);
    this.setState({itemSet: true, itemDisplay: item.name});
  }
});

export default TaskEventInput;

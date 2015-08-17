import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import EventStore from '../../stores/EventStore';
import EventActions from '../../actions/EventActions';

var EventFormInput = React.createClass({
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
  _onChange() {
    this.setState({items: EventStore.searchResults});
  },
  retrieveItem: function(id) {
    // to do
    // Utils.get('/events/' + id + '.json', {}, function(result) {
    //   this.setState({itemSet: true, itemDisplay: result.event.name});
    // }.bind(this));
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    EventActions.search(params);
    // to do
  },
  itemSelected: function(item) {
    this.setValue(item.id);
    this.setState({itemSet: true, itemDisplay: item.name});
    if (this.props.handleItemSelected) this.props.handleItemSelected(item);
  }
});

export default EventFormInput;

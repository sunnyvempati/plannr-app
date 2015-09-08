import FormInputClassesMixin from '../mixins/FormInputClassesMixin';
import AutocompleteInput from '../mixins/AutocompleteInput';
import EventVendorStore from '../../stores/EventVendorStore';
import EventVendorActions from '../../actions/EventVendorActions';

var ExpenseVendorInput = React.createClass({
  mixins: [
    FormInputClassesMixin,
    AutocompleteInput
  ],
  componentDidMount: function() {
    EventVendorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    EventVendorStore.removeChangeListener(this._onChange);
  },
  retrieveItem(id) {
    let item = EventVendorStore.get(id);
    if (item) {
      this.setState({itemSet: true, itemDisplay: item.name});
    } else EventVendorActions.get(id);
  },
  _onChange() {
    let id = this.getValue();
    let itemFound = !!id && EventVendorStore.get(id);
    this.setState({
      items: EventVendorStore.searchResults,
      itemSet: !!itemFound,
      itemDisplay: itemFound && itemFound.name
    });
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5,
      with_event_id: this.props.eventId
    };
    EventVendorActions.search(params);
  },
  itemSelected: function(item, term) {
    this.setValue(item.id);
    this.setState({itemSet: true, itemDisplay: item.name});
  }
});

export default ExpenseVendorInput;

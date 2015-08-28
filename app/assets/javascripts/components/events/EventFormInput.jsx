import Autocomplete from '../generic/Autocomplete';
import EventStore from '../../stores/EventStore';
import EventActions from '../../actions/EventActions';

var EventFormInput = React.createClass({
  getInitialState: function() {
    return {
      originalValue: null,
      itemSet: false,
      itemDisplay: null,
      items: [],
      focus: false
    };
  },
  getDefaultProps: function() {
    return {
      autocompleteClassName: "Autocomplete"
    };
  },
  editField: function() {
    this.setState({itemSet: false, itemDisplay: null, items: [], focus: true});
  },
  componentDidMount() {
    EventStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  },
  componentWillReceiveProps: function(nextProps) {
    var inputVal = nextProps.value;
    if (!inputVal) { this.resetState(); return; }
  },
  resetState: function() {
    this.setState({itemSet: false, itemDisplay: null});
  },
  _onChange() {
    this.setState({items: EventStore.searchResults});
  },
  retrieveData: function(term) {
    var params = {
      search_query: term,
      with_search_limit: 5
    };
    EventActions.search(params);
  },
  itemSelected: function(item) {
    this.setState({itemSet: true, itemDisplay: item.name});
    if (this.props.handleItemSelected) this.props.handleItemSelected(item);
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveData}
                    itemSelected={this.itemSelected}
                    data={this.state.items}
                    focus={this.state.focus}
                    className={this.props.autocompleteClassName} />
    );
  },
  renderSelectedItem: function() {
    return (
      <div className="FormInput-field">
        <div className="Autocomplete-picked" onClick={this.editField}>
          <div className="Autocomplete-pickedName u-wrapWithEllipsis">
            {this.state.itemDisplay}
          </div>
          <div className="Autocomplete-edit">
            <i className="fa fa-pencil"></i>
          </div>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.itemSet ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

export default EventFormInput;

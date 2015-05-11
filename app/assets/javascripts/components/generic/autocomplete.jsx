var Autocomplete = React.createClass({
  propTypes: {
    itemSelected: React.PropTypes.func,
    focus: React.PropTypes.bool,
    retrieveData: React.PropTypes.func,
    renderItem: React.PropTypes.func,
    data: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      placeholder: "Start typing..."
    };
  },
  mixins: [boldAutocompleteItem],
  getInitialState: function() {
    return {
      open: false,
      term: ""
    };
  },
  componentDidMount: function() {
    if (this.props.focus) {
      React.findDOMNode(this.refs.autocompleteInput).focus();
    }
  },
  onBlur: function() {
    this.setState({open: false});
  },
  onFocus: function(e) {
    this.setState({open: true});
    this.props.retrieveData(e.target.value);
  },
  onChange: function(e) {
    this.setState({term: e.target.value, open: true});
    this.props.retrieveData(e.target.value);
  },
  itemSelected: function(e, item, term) {
    var input = React.findDOMNode(this.refs.autocompleteInput);
    input.value = "";
    input.blur();
    this.props.itemSelected(item, term);
    this.setState({term: "", open: false});
  },
  // this is used so onBlur isn't called right
  // before onclick which hides the entire
  // button list.  Ask Sunny if you want a better explanation.
  preventDefault: function(e) {
    e.preventDefault();
  },
  getResults: function() {
    var term = this.state.term;
    var cx = React.addons.classSet;
    var resultsClasses = cx({
      'Autocomplete-results': true,
      'hidden': !this.state.open
    });
    var results = this.props.data.map(function(item) {
      var itemName = this.formatMatchedCharacters(item.name, term);
      var defaultRenderItem = <div className="Autocomplete-resultsItem" dangerouslySetInnerHTML={{__html: itemName}}></div>;
      var renderItem = !!this.props.renderItem ? this.props.renderItem(item, term) : defaultRenderItem;
      return (
        <div className="Button--autocomplete"
                onMouseDown={this.preventDefault}
                onClick={this.itemSelected.bind(this, event, item, term)}
                key={item.id}>
          {renderItem}
        </div>
      );
    }.bind(this));
    return (
      <div className={resultsClasses}>
        {results}
      </div>
    );
  },
  keyDown: function(e) {
    // enter key
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  },
  render: function() {
    return (
      <div className="Autocomplete">
        <input placeholder={this.props.placeholder}
               onFocus={this.onFocus}
               onChange={this.onChange}
               className="Autocomplete-input"
               onKeyDown={this.keyDown}
               onBlur={this.onBlur}
               ref="autocompleteInput">
        </input>
        {this.getResults()}
      </div>
    );
  }
});

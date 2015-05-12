var Autocomplete = React.createClass({
  propTypes: {
    itemSelected: React.PropTypes.func.isRequired,
    retrieveData: React.PropTypes.func.isRequired,
    renderItem: React.PropTypes.func.isRequired,

    focus: React.PropTypes.bool,
    data: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      placeholder: "Start typing...",
      focus: false,
      data: []
    };
  },
  mixins: [boldAutocompleteItem],
  getInitialState: function() {
    return {
      term: ""
    };
  },
  componentDidMount: function() {
    if (this.props.focus) {
      React.findDOMNode(this.refs.autocompleteInput).focus();
    }
  },
  onBlur: function() {
  },
  onFocus: function(e) {
    this.props.retrieveData(e.target.value);
  },
  onChange: function(e) {
    this.setState({term: e.target.value});
    this.props.retrieveData(e.target.value);
  },
  itemSelected: function(e, item, term) {
    var input = React.findDOMNode(this.refs.autocompleteInput);
    input.value = "";
    input.blur();
    this.props.itemSelected(item.id, item.name);
    this.setState({term: ""});
  },
  // this is used so onBlur isn't called right
  // before onclick which hides the entire
  // button list.  Ask Sunny if you want a better explanation.
  preventDefault: function(e) {
    e.preventDefault();
  },
  renderAutocompleteList: function() {
    var term = this.state.term;
    var cx = React.addons.classSet;
    var resultsClasses = cx({
      'Autocomplete-results': true
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
               ref="autocompleteInput"
               id={this.props.id}>
        </input>
        {this.renderAutocompleteList()}
      </div>
    );
  }
});

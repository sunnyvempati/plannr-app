var Autocomplete = React.createClass({
  getDefaultProps: function() {
    return {
      placeholder: "Start typing..."
    };
  },
  mixins: [boldAutocompleteItem],
  getInitialState: function() {
    return {
      open: true,
      term: ""
    };
  },
  componentDidMount: function() {
    if (this.props.focus) {
      React.findDOMNode(this.refs.autocompleteInput).focus();
    }
  },
  closeResults: function() {
    if (this.isMounted()) {
      this.setState({open: false});
    }
  },
  onBlur: function() {
    // this timeout exists so onClick fires before onBlur
    setTimeout(this.closeResults, 100);
  },
  onFocus: function(e) {
    this.setState({open: true});
    this.props.retrieveData(e.target.value);
  },
  onChange: function(e) {
    this.setState({term: e.target.value});
    this.props.retrieveData(e.target.value);
  },
  itemSelected: function(e, item, term) {
    React.findDOMNode(this.refs.autocompleteInput).value = "";
    this.props.itemSelected(item, term);
    this.setState({term: ""});
  },
  getTerm: function() {
    var autocompleteComponent = React.findDOMNode(this.refs.autocompleteInput);
    return !!autocompleteComponent ? autocompleteComponent.value : "";
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
        <button className="Button--autocomplete" onClick={this.itemSelected.bind(this, event, item, term)} key={item.email}>
          {renderItem}
        </button>
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
               ref="autocompleteInput" />
        {this.getResults()}
      </div>
    );
  }
});

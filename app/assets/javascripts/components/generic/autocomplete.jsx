var Autocomplete = React.createClass({
  getInitialState: function() {
    return {
      open: true
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
    this.props.retrieveData(e.target.value);
  },
  itemSelected: function(item) {
    this.props.itemSelected(item);
  },
  updateItemName: function(name, term) {
    return name.replace(new RegExp('(^|)(' + term + ')(|$)','ig'), '$1<b>$2</b>$3');
  },
  getTerm: function() {
    var autocompleteComponent = React.findDOMNode(this.refs.autocompleteInput);
    return !!autocompleteComponent ? autocompleteComponent.value : "";
  },
  getResults: function() {
    var cx = React.addons.classSet;
    var resultsClasses = cx({
      'Autocomplete-results': true,
      'hidden': !this.state.open
    });
    var term = this.getTerm();
    var results = this.props.data.map(function(item) {
      var itemName = this.updateItemName(item.name, term);
      var defaultRenderItem = <div className="Autocomplete-resultsItem"
             dangerouslySetInnerHTML={{__html: itemName}}></div>;
      var renderItem = !!this.props.renderItem ? this.props.renderItem(item, term) : defaultRenderItem;
      return (
        <div onClick={this.itemSelected.bind(this, item)}>
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
      <div onBlur={this.onBlur}>
        <input placeholder="Start typing..."
               onFocus={this.onFocus}
               onChange={this.onChange}
               className="Autocomplete"
               onKeyDown={this.keyDown}
               ref="autocompleteInput" />
        {this.getResults()}
      </div>
    );
  }
});

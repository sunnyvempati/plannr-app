var FormInputAutocomplete = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    retrieveItemAndSetItem: React.PropTypes.func.isRequired,
    retrieveAutocompleteData: React.PropTypes.func.isRequired,
    quickCreateItemAndSetItem: React.PropTypes.func.isRequired,
    itemDataArray: React.PropTypes.array.isRequired,

    value: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var itemId = this.props.value || null;
    if (itemId) {
      this.props.retrieveItemAndSetItem(itemId);
    }
  },
  onItemSelected: function(item, term) {
    if (item.id == -1) {
      this.props.quickCreateItemAndSetItem(term);
    }
    else {
      this.props.setItem(item.id, item.name);
    }
  },
  onAutocompleteEditButtonClick: function() {
    if (this.isMounted()) {
      this.setState({focus: true});
    }
    this.props.setItem(null, null);
  },

  renderAutocomplete: function() {
    return (
      <Autocomplete id={this.props.id}
                    name={this.props.name}
                    retrieveData={this.props.retrieveAutocompleteData}
                    itemSelected={this.onItemSelected}
                    data={this.props.itemDataArray}
                    focus={this.state.focus}/>
    );
  },
  renderSelectedItem: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.onAutocompleteEditButtonClick}>
        <div className="Autocomplete-pickedName">
          {this.props.itemName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = (this.props.itemName != null) ? this.renderSelectedItem() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

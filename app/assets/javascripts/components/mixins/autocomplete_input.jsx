var AutocompleteInput = {
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      itemSet: false,
      itemDisplay: null,
      items: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  componentDidMount: function() {
    var assignedToValue = this.getValue();
    if (assignedToValue) this.retrieveItem(assignedToValue);
  },
  editField: function() {
    this.setState({itemSet: false, itemDisplay: null, items: [], focus: true});
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
  renderSelectedItem: function(className) {
    return (
      <div className={classNames(className)}>
        <div className="Autocomplete-picked" onClick={this.editField}>
          <div className="Autocomplete-pickedName">
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
    var classes = this.getClassNames();
    var inputRender = this.state.itemSet ? this.renderSelectedItem(classes.inputField) : this.renderAutocomplete();
    return (
      <div className={classNames(classes.inputContainer)}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
};

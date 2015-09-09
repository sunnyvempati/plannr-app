import Formsy from 'formsy-react';
import classNames from 'classnames';
import Autocomplete from '../generic/Autocomplete';

var AutocompleteInput = {
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      originalValue: null, // this is used to check if value was changed outside the component via props
      originalValue: null,
      itemSet: false,
      itemDisplay: null,
      items: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
  getDefaultProps: function() {
    return {
      disabled: false,
      autocompleteClassName: "Autocomplete"
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var inputVal = nextProps.value;
    var valueChange = inputVal != this.state.originalValue;
    // if nextProp was set to null
    if (!inputVal && valueChange) { this.resetState(); return; }
    // valueChange here means it got set to something outside the component
    // item isn't set or value changed AND there's a value
    if ((!this.state.itemSet || valueChange) && inputVal) {
      this.retrieveItem(inputVal);
      this.setState({originalValue: inputVal});
    }
  },
  resetState: function() {
    this.setState({itemSet: false, itemDisplay: null});
  },
  editField: function() {
    if (this.props.disabled) return;
    this.setValue(null);
    this.setState({itemSet: false, itemDisplay: null, items: [], focus: true});
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveData}
                    itemSelected={this.itemSelected}
                    data={this.state.items}
                    focus={this.state.focus}
                    disabled={this.props.disabled}
                    className={this.props.autocompleteClassName}
                    invalid={!this.isValid() && !this.isPristine()} />
    );
  },
  renderSelectedItem: function(className) {
    let pencilRender = this.props.disabled ? null : <i className="fa fa-pencil"></i>;
    let itemClasses = classNames({
      "Autocomplete-pickedName u-wrapWithEllipsis": true,
      "disabled": this.props.disabled
    });
    let pickedClasses = classNames({
      'Autocomplete-picked': true,
      'disabled': this.props.disabled
    });
    return (
      <div className={classNames(className)}>
        <div className={pickedClasses} onClick={this.editField}>
          <div className={itemClasses}>
            {this.state.itemDisplay}
          </div>
          <div className="Autocomplete-edit">
            {pencilRender}
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

export default AutocompleteInput;

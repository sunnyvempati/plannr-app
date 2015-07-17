var CheckboxInput = React.createClass({
  getInitialState: function() {
    return {
      checked: this.props.checked
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({checked: nextProps.checked});
  },
  checkChanged: function() {
    var checked = !this.state.checked;
    this.setState({checked: checked});
    this.props.onChange(checked, this.props.value);
  },
  renderCheckboxDisplay: function() {
    var display = this.props.checkboxDisplay;
    if (!!display) {
      return (
        <div className='Checkbox-display u-clickable'>
          {display}
        </div>
      );
    }
  },
  render: function() {
    var checkboxClasses = classNames({
      'Checkbox-check': true,
      'is-rounded': this.props.rounded,
      'is-checked': this.state.checked,
      'u-hidden': this.props.hideCheckbox
    });
    return (
      <div className="Checkbox" onClick={this.checkChanged}>
        <div className="CheckboxContainer">
          <div className={checkboxClasses}>
            <div id="checkmark"
                 className={this.state.checked ? "" : "u-hidden"}></div>
          </div>
        </div>
        {this.renderCheckboxDisplay()}
      </div>
    );
  }
});

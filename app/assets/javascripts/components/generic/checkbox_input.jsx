var CheckboxInput = React.createClass({
  getInitialState: function() {
    return {
      checked: false
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
  render: function() {
    var checkboxClasses = classNames({
      'Checkbox': true,
      'is-checked': this.state.checked
    });
    return (
      <div className="CheckboxContainer" onClick={this.checkChanged}>
        <div className={checkboxClasses}>
          <div id="checkmark"
               className={this.state.checked ? "" : "u-hidden"}></div>
        </div>
      </div>
    );
  }
});

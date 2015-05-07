var CheckboxInput = React.createClass({
  getInitialState: function() {
    return {
      checked: false
    };
  },
  checkChanged: function() {
    this.setState({checked: !this.state.checked});
    this.props.onChange(this.state.checked);
  },
  render: function() {
    var cx = React.addons.classSet;
    var checkboxClasses = cx({
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

var ToggleButton = React.createClass({
  getInitialState: function() {
    return {
      checked: this.props.checked
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({checked: nextProps.checked});
  },
  checkChanged() {
    var checked = !this.state.checked;
    this.setState({checked: checked});
    this.props.onChange(checked);
  },
  render: function() {
    var checked = this.state.checked ? "checked" : "";
    return (
      <div className="ToggleContainer" onClick={this.checkChanged}>
        <div className={"Toggle-bar " + checked}></div>
        <div className={"Toggle-button " + checked}></div>
      </div>
    );
  }
});

export default ToggleButton

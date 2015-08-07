var ToggleButton = React.createClass({
  getInitialState: function() {
    return {
      toggle: true
    };
  },
  render: function() {
    var checked = this.props.checked ? "checked" : "";
    return (
      <div className="ToggleContainer" onClick={this.props.handleClick}>
        <div className={"Toggle-bar " + checked}></div>
        <div className={"Toggle-button " + checked}></div>
      </div>
    );
  }
});

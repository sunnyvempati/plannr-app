var ToggleButton = React.createClass({
  getInitialState: function() {
    return {
      toggle: true
    };
  },
  toggleMe: function() {
    var checked = !this.state.toggle;
    this.setState({toggle: checked})
    $("#toggleMe").prop('checked', checked);
  },
  render: function() {
    console.log(this.state.toggle);
    return (
      <div className="ToggleContainer"
           onClick={this.toggleMe}
           id="toggleMe">
        <div className="Toggle-bar"></div>
        <div className="Toggle-button"></div>
      </div>
    );
  }
});

var TaskQuickAddInput = React.createClass({
  getInitialState: function() {
    return {
      errorState: false
    };
  },
  keyPress: function(e) {
    if (e.target.value.length == 1) {
      this.setState({errorState: false});
    }
    if (e.which == 13) {
      if (e.target.value == "") {
        this.setState({errorState: true});
        return;
      }
      var text = e.target.value;
      e.target.value = "";
      this.props.onAdd({task: {name: text, event_id: this.props.eventId}});
    }
  },
  render: function() {
    var inputClasses = classNames({
      "Autocomplete-input": true,
      "is-invalid": this.state.errorState
    });
    return (
      <div className="TaskQuickAddInput">
        <input placeholder="Add Task"
               className={inputClasses}
               onKeyPress={this.keyPress} />
      </div>
    );
  }
});

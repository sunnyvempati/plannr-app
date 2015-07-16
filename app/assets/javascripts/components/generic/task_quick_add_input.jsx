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
      this.openCreateTaskModal(text);
    }
  },
  openCreateTaskModal: function(text) {
    var props = {
      model: {name: text, event_id: this.props.eventId},
      authToken: this.props.authToken,
      onSuccess: this.props.onAdd,
      reopenCreateTaskModal: this.openCreateTaskModal,
      routeVerb: 'POST'
    };
    var modal = React.createElement(EditTaskModal, props);
    React.render(modal, document.getElementById('modal'));
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

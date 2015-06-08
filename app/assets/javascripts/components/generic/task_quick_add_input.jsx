var TaskQuickAddInput = React.createClass({
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
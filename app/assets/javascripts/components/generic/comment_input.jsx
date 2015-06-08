var CommentInput = React.createClass({
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
      this.props.onAdd({body: text});
    }
  },
  render: function() {
    var inputClasses = classNames({
      "Autocomplete-input": true,
      "is-invalid": this.state.errorState
    });
    return (
      <div className="Comments-input">
        <input placeholder="Add Comment"
               className={inputClasses}
               onKeyPress={this.keyPress} />
      </div>
    );
  }
});

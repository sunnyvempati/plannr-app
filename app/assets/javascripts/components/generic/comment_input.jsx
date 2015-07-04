var CommentInput = React.createClass({
  getInitialState: function() {
    var value = !!this.props.data ? this.props.data.body : "";
    return {
      errorState: false,
      inputValue: value
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
      this.setState({inputValue: ""});
      var commentId = !!this.props.data ? this.props.data.id : null;
      this.props.onAdd({id: commentId, body: text});
    }
  },
  changeValue: function(e) {
    this.setState({inputValue: e.target.value});
  },
  render: function() {
    var inputClasses = classNames({
      "Autocomplete-input": true,
      "is-invalid": this.state.errorState,
      "u-noBorder": !!this.props.data
    });
    var inputValue = !!this.props.data ? this.props.data.body : "";
    return (
      <div className="CommentInput">
        <input placeholder="Add Comment"
               className={inputClasses}
               onKeyPress={this.keyPress}
               value={this.state.inputValue}
               onChange={this.changeValue} />
      </div>
    );
  }
});

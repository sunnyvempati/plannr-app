var CommentInput = React.createClass({
  keyPressed: function(e) {
    console.log(e.target.value);
  },
  render: function() {
    return (
      <div className="Comments-input">
        <input placeholder="Add Comment"
               className="Autocomplete-input"
               onKeyPress={this.keyPressed} />
      </div>
    );
  }
});
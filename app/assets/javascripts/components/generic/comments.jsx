  var Comments = React.createClass({
  getInitialState: function() {
    return {
      comments: []
    };
  },
  componentDidMount: function() {
    this.getComments();
  },
  getParams: function(comment) {
    return {
      comment: comment,
      commentable_type: this.props.entity,
      commentable_id: this.props.entity_id
    }
  },
  getComments: function() {
    $.get("/comments", this.getParams(),  function(result) {
      this.setState({comments: result.comments});
    }.bind(this));
  },
  addComment: function(comment) {
    var comments = this.state.comments;
    $.post("/comments", this.getParams(comment), function(result) {
      comments.unshift(result.comment);
      this.setState({comments: comments});
    }.bind(this));
  },
  render: function() {
    return (
      <div className="Comments">
        <CommentInput onAdd={this.addComment} />
        <CommentList data={this.state.comments} />
      </div>
    );
  }
});

var Comments = React.createClass({
  mixins: [Utils],
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
  deleteComment: function(id) {
    var url = "/comments/" + id + ".json";
    var _this = this;
    $.ajax({
      url: url,
      type: 'DELETE',
      success: function(result) {
        var newData = _this.spliceResults(_this.state.comments, [id]);
        _this.setState({comments: newData});
      }
    });
  },
  render: function() {
    return (
      <div className="Comments">
        <CommentInput onAdd={this.addComment} />
        <CommentList data={this.state.comments}
                     currentUser={this.props.currentUser}
                     deleteComment={this.deleteComment} />
      </div>
    );
  }
});

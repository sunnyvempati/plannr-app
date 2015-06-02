var Comments = React.createClass({
  getInitialState: function() {
    return {
      comments: []
    };
  },
  componentDidMount: function() {
    this.getComments();
  },
  getComments: function() {
    $.get("/comments", {commentable_type: this.props.entity},  function(result) {
      this.setState({comments: result.comments});
    }.bind(this));
  },
  addComment: function(comment) {
    console.log(comment);
  },
  render: function() {
    return (
      <div className="Comments">
        <CommentInput onAdd={this.addComment} />
        <CommentList />
      </div>
    );
  }
});
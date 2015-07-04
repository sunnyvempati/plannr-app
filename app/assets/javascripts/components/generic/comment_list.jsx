var CommentList = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },
  handleDeleteComment: function(id) {
    this.props.deleteComment(id);
  },
  getRenderedList: function() {
    if (this.props.data.length == 0) {
      return (
        <div className="Notice">No Comments</div>
      );
    }
    return this.props.data.map(function(comment) {
      return (
        <Comment data={comment}
                 handleDeleteComment={this.handleDeleteComment.bind(this, comment.id)}
                 currentUser={this.props.currentUser}
                 key={comment.id} />
      )
    }.bind(this));
  },
  render: function() {
    return (
      <div className="CommentsList">
        {this.getRenderedList()}
      </div>
    );
  }
});

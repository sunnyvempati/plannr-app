import Comment from './Comment';

var CommentList = React.createClass({
  handleDeleteComment: function(id) {
    this.props.deleteComment(id);
  },
  getRenderedList: function() {
    if (this.props.data && !this.props.data.length) {
      return (
        <div className="Notice">No Comments</div>
      );
    }
    return this.props.data.map(function(comment) {
      return (
        <Comment data={comment}
                 handleDeleteComment={this.handleDeleteComment.bind(this, comment.id)}
                 handleUpdate={this.props.handleUpdate}
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

export default CommentList;

var CommentList = React.createClass({
  getRenderedList: function() {
    if (this.props.data.length == 0) {
      return (
        <div className="Notice">No Comments</div>
      )
    }
    return this.props.data.map(function(comment) {
      var canDelete = this.props.currentUser.id == comment.commenter.id;
      var deleteClasses = classNames({
        "ListItem-headerMenu": true,
        "u-hidden": !canDelete
      })
      return (
        <div className="Comments-listItem">
          <div className="ListItem-header">
            <div className="ListItem-title">
              <div className="ListItem-commenter">
                {comment.user_name}
              </div>
              <div className="ListItem-time">
                {comment.time}
              </div>
            </div>
            <div className={deleteClasses}>
              <div className="CommentClose" onClick={this.props.deleteComment.bind(this, comment.id)}></div>
            </div>
          </div>
          <div className="ListItem-text">
            {comment.body}
          </div>
        </div>
      )
    }.bind(this));
  },
  render: function() {
    return (
      <div className="Comments-list">
        {this.getRenderedList()}
      </div>
    );
  }
});

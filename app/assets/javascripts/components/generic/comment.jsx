var Comment = React.createClass({
  getInitialState: function() {
    return {
      editMode: false,
      locked: false
    };
  },
  renderComment: function() {
    var comment = this.props.data;
    var currentUserComment = this.props.currentUser.id == comment.commenter.id;
    var actionClasses = classNames({
      "ListItem-headerMenu": true,
      "u-hidden": !currentUserComment
    });
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
          <div className={actionClasses}>
            <i className="fa fa-unlock-alt CommentMenuIcon"></i>
            <i className="fa fa-pencil CommentMenuIcon" onClick={this.toggleEditMode}></i>
            <div className="CommentClose" onClick={this.props.handleDeleteComment}>
            </div>
          </div>
        </div>
        <div className="ListItem-text">
          {comment.body}
        </div>
      </div>
    );
  },
  toggleEditMode: function() {
    this.setState({editMode: !this.state.editMode});
  },
  updateComment: function(comment) {
    HttpHelpers.putToServer("/comments", comment, function(result) {
      console.log(result);
    })
  },
  renderEditableComment: function() {
    var comment = this.props.data;
    return (
      <div className="Comments-listItem">
        <div className="ListItem-header">
          <div className="ListItem-title">
            <div className="ListItem-commenter">
              {comment.user_name}
            </div>
          </div>
          <div className="ListItem-headerMenu">
            <div className="CommentClose" onClick={this.toggleEditMode}>
            </div>
          </div>
        </div>
        <div className="ListItem-text">
          <CommentInput data={comment} onAdd={this.updateComment} />
        </div>
      </div>
    );
  },
  render: function() {
    return this.state.editMode ? this.renderEditableComment() : this.renderComment();
  }
});

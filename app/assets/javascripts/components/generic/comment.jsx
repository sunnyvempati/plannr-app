var Comment = React.createClass({
  mixins: [ToastMessages],
  getInitialState: function() {
    return {
      editMode: false,
      comment: this.props.data
    };
  },
  renderComment: function(comment) {
    var currentUserComment = this.props.currentUser.id == comment.commenter.id;
    var actionClasses = classNames({
      "ListItem-headerMenu": true,
      "u-hidden": !currentUserComment
    });
    var lockClasses = classNames({
      'CommentMenuIcon': true,
      'fa fa-lock locked': this.state.comment.locked,
      'fa fa-unlock': !this.state.comment.locked,
    });
    var lockClass = this.state.comment.locked ? "fa fa-lock" : "fa fa-unlock";
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
            <div title="If locked, comment only viewable by you.">
              <i className={lockClasses} onClick={this.toggleLocked.bind(this, comment)}></i>
            </div>
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
  toggleLocked: function(comment) {
    var params = {
      id: comment.id,
      comment: {
        locked: !comment.locked
      }
    };
    Utils.put("/comments", params, function(result) {
      this.setState({comment: result.comment});
    }.bind(this));
  },
  toggleEditMode: function() {
    this.setState({editMode: !this.state.editMode});
  },
  updateComment: function(comment) {
    var params = {
      id: comment.id,
      comment: {
        body: comment.body
      }
    };
    Utils.put("/comments", params, function(result) {
      this.toggleEditMode();
      this.setState({comment: result.comment});
    }.bind(this));
  },
  renderEditableComment: function(comment) {
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
    var comment = this.state.comment;
    return this.state.editMode ? this.renderEditableComment(comment) : this.renderComment(comment);
  }
});

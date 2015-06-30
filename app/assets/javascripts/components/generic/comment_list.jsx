var CommentList = React.createClass({
  getRenderedList: function() {
    if (this.props.data.length == 0) {
      return (
        <div className="Notice">No Comments</div>
      )
    }
    return this.props.data.map(function(comment) {
      return (
        <div key={comment.id} className="Comments-listItem">
          <div className="ListItem-title">
            <div className="ListItem-commenter">
              {comment.user_name}
            </div>
            <div className="ListItem-time">
              {comment.time}
            </div>
          </div>
          <div className="ListItem-text">
            {comment.body}
          </div>
        </div>
      )
    });
  },
  render: function() {
    return (
      <div className="Comments-list">
        {this.getRenderedList()}
      </div>
    );
  }
});

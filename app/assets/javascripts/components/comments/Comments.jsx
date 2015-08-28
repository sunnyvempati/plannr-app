import CommentActions from '../../actions/CommentActions';
import CommentStore from '../../stores/CommentStore';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

var Comments = React.createClass({
  getInitialState: function() {
    return {
      comments: []
    };
  },
  componentDidMount() {
    CommentStore.addChangeListener(this._onCommentsChange);
    this.getCommentState();
  },
  componentWillUnmount() {
    CommentStore.removeChangeListener(this._onCommentsChange);
  },
  _onCommentsChange() {
    this.getCommentState();
  },
  getCommentState() {
    let params = this.getParams();
    let commentsCached = CommentStore.isCached(params);
    if (commentsCached) this.setState({comments: CommentStore.getFromCache(params)});
    else CommentActions.getComments(params);
  },
  getParams: function() {
    return {
      commentable_type: this.props.entity,
      commentable_id: this.props.entity_id
    }
  },
  addComment: function(comment) {
    CommentActions.create(comment, this.getParams());
  },
  deleteComment: function(id) {
    CommentActions.delete(id, this.getParams());
  },
  updateComment(id, params) {
    CommentActions.update(id, params);
  },
  render: function() {
    return (
      <div className="Comments">
        <div className="Comments-input">
          <CommentInput onAdd={this.addComment} />
        </div>
        <div className="Comments-list">
          <CommentList data={this.state.comments}
                       deleteComment={this.deleteComment}
                       handleUpdate={this.updateComment} />
        </div>
      </div>
    );
  }
});

export default Comments;

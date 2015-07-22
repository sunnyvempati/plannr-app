var MenuFooter = React.createClass({
  openFeedbackModal: function() {
    document.getElementById('menu-trigger').checked = false;
    Modal.mount({}, FeedbackModal);
  },
  render: function() {
    return (
      <div className="MenuFooter" onClick={this.openFeedbackModal}>
        Leave us feedback
      </div>
    );
  }
});

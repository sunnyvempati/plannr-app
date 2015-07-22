var FeedbackModal = React.createClass({
  mixins: [Modal],
  getInitialState: function() {
    return {
      success: false
    };
  },
  onSuccess: function() {
    this.setState({success: true});
    setTimeout(this.closeModal, 2000);
  },
  renderFeedback: function() {
    var success = this.state.success;
    if (success) {
      return (
        <div className="SuccessMessage">
          We truly appreciate the feedback.  Thank you!
        </div>
      );
    }
    else {
      return (
        <FeedbackForm onSuccess={this.onSuccess} />
      )
    }
  },
  renderModalContent: function() {
    return (
      <div className="FeedbackModal">
        {this.renderFeedback()}
      </div>
    );
  }
});

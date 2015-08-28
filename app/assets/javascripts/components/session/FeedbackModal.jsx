import ModalMixin from '../mixins/ModalMixin';
import ModalActions from '../../actions/ModalActions';
import FeedbackForm from './FeedbackForm';

var FeedbackModal = React.createClass({
  mixins: [ModalMixin],
  getInitialState: function() {
    return {
      success: false
    };
  },
  onSuccess: function() {
    this.setState({success: true});
    setTimeout(() => ModalActions.close(), 3000);
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
        {this.renderCloseModal()}
        {this.renderFeedback()}
      </div>
    );
  }
});

export default FeedbackModal;

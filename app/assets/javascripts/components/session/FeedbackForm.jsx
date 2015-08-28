import ButtonListMixin from '../mixins/ButtonListMixin';
import FormMixin from '../mixins/FormMixin';
import Form from '../generic/Form';
import TextAreaInput from '../generic/TextAreaInput';
import FeedbackActions from '../../actions/FeedbackActions';

var FeedbackForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  url: '/feedback.json',
  mapInputs: function (inputs) {
    return {
      'feedback': {
        'message': inputs.message
      }
    };
  },
  onSuccess: function () {
    this.props.onSuccess();
  },
  postForm(data) {
    FeedbackActions.create(data);
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id="feedback_form">
          <TextAreaInput
            name="message"
            form="feedback_form"
            placeholder="Tell us how we can improve.  Thank you!"
            className="FormInput"
            required
          />
          {this.renderFormButton("Send")}
        </Form>
      </div>
    );
  }
});

export default FeedbackForm;

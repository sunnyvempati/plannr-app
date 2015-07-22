var FeedbackForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  url: '/feedback.json',
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'feedback': {
        'message': inputs.message
      }
    };
  },
  onSuccess: function (result) {
    this.props.onSuccess();
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
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
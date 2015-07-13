var ProfileForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/profiles.json',
  mapInputs: function(inputs) {
    return {
      'profile': {
        'first_name': inputs.first_name,
        'last_name': inputs.last_name,
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  onSuccess: function() {
    location.href = '/events';
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}>
          <FormInput name="first_name"
                     type="text"
                     label="First Name*"
                     value={null}
                     required
          />
          <FormInput name="last_name"
                     type="text"
                     label="Last Name*"
                     value={null}
                     required
          />
          {this.renderFormButton('Save')}
        </Form>
      </div>
    );
  }
});

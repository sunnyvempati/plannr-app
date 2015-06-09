var ProfileForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'profile': {
        'first_name': inputs.first_name,
        'last_name': inputs.last_name,
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function() {
    location.href = '/events';
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/profiles'
              mapping={this.mapInputs}
              onSuccess={this.changeUrl}
              authToken={this.props.authToken}
              primaryButtonText="Save Profile">
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
        </Form>
      </div>
    );
  }
});

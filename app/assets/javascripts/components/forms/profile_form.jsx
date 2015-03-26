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
          <FormInput name="first_name" type="text" placeholder="John" label="First Name*" required/>
          <FormInput name="last_name" type="text" placeholder="Doe" label="Last Name*" required/>
        </Form>
      </div>
    );
  }
});

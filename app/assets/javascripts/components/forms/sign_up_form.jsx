var SignUpForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'company': {
        'name': inputs.company
      },
      'user': {
        'email': inputs.email,
        'password': inputs.password,
        'password_confirmation': inputs.password_confirmation
      },
      'authenticity_token': inputs.authenticity_token
    };
  },
  onSuccess: function(response) {
    var href = "/users/" + response.id + "/profile";
    location.href = href;
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/new_user'
              mapping={this.mapInputs}
              onSuccess={this.onSuccess}
              onError={this.onError}
              authToken={this.props.authToken}
              primaryButtonText="Sign Up"
              secondaryButtonVisible={true}
              secondaryButtonText='Log in'
              secondaryButtonHref='/login'
              showButtonList={true}>
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="test@your_company.com" label="Email*" required/>
          <FormInput name="password" type="password" placeholder="Make it something cool" label="Password*" required/>
          <FormInput name="password_confirmation" type="password" placeholder="Type it again" label="Confirm Password*" required/>
          <FormInput name="company" type="company" placeholder="Where do you work?" label="Company*" required/>
        </Form>
      </div>
    );
  }
});
var LoginForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password,
      'authenticity_token': inputs.authenticity_token
    };
  },
  changeUrl: function() {
    location.href = '/events';
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form url='/login'
              mapping={this.mapInputs}
              onSuccess={this.changeUrl}
              authToken={this.props.authToken}
              primaryButtonText="Login"
              secondaryButtonVisible={true}
              secondaryButtonHref='/new_user'
              secondaryButtonText='Sign up'
              showButtonList={true}>
          <FormInput name="email" validations="isEmail" validationError="Invalid email" placeholder="email" label="Email*" required/>
          <FormInput name="password" type="password" placeholder="password" label="Password*" required/>
        </Form>
      </div>
    );
  }
});

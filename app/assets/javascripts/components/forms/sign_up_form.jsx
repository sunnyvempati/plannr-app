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
      'invite_token': inputs.invitation_token,
      'authenticity_token': inputs.authenticity_token
    };
  },
  componentDidMount: function() {
    this.refs.userEmail.setValue(this.props.email);
    this.refs.userEmail.props.disabled = true;
    if (this.props.company) {
      this.refs.userCompany.setValue(this.props.company.name);
      this.refs.userCompany.props.disabled = true;
    }
  },
  onSuccess: function(response) {
    location.href = "/profiles/new";
  },
  render: function() {
    var invited = this.props.company ? true : false;
    return (
      <div className="FormContainer">
        <Form url='/sign_up'
              mapping={this.mapInputs}
              onSuccess={this.onSuccess}
              onError={this.onError}
              authToken={this.props.authToken}
              primaryButtonText="Sign Up"
              secondaryButtonVisible={true}
              secondaryButtonText='Log in'
              secondaryButtonHref='/login'
              showButtonList={true}>
          <FormInput type="hidden" name="invitation_token" value={this.props.invite_token}  />
          <FormInput name="email" validations="isEmail" validationError="Invalid email" label="Email*" ref="userEmail" required/>
          <FormInput name="password" type="password" label="Password*" required/>
          <FormInput name="password_confirmation" type="password" label="Confirm Password*" required/>
          <FormInput name="company" type="company" placeholder="Where do you work?" label="Company*" ref="userCompany" required/>
        </Form>
      </div>
    );
  }
});

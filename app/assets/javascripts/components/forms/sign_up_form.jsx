var SignUpForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/sign_up.json',
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
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}>
          <FormInput type="hidden" name="invitation_token" value={this.props.invite_token}  />
          <FormInput name="email" label="Email*" ref="userEmail" value={null} required/>
          <FormInput name="password" type="password" label="Password*" value={null} required/>
          <FormInput name="password_confirmation" type="password" label="Confirm Password*" value={null} required/>
          <FormInput name="company" type="company" placeholder="Where do you work?" label="Company*" value={null} ref="userCompany" required/>
          {this.renderFormButton('Sign up')}
        </Form>
      </div>
    );
  }
});

import ButtonListMixin from '../mixins/ButtonListMixin.jsx';
import Button from '../generic/Button.jsx';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';

var SignUpForm = React.createClass({
  mixins: [ButtonListMixin],
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
  // componentDidMount: function() {
  //   this.refs.userEmail.setValue(this.props.email);
  //   this.refs.userEmail.props.disabled = true;
  //   if (this.props.company) {
  //     this.refs.userCompany.setValue(this.props.company.name);
  //     this.refs.userCompany.props.disabled = true;
  //   }
  // },
  render: function() {
    var invited = this.props.company ? true : false;
    console.log("SIGN UP");
    return (
      <div className="SignUpContainer">
        <div className="TrialBadge"></div>
        <div className="Trial-title">
          Start your free trial and get planning today!
        </div>
        <div className="Trial-subtitle">
          We’re really excited to see how you use Plannr!
          Please don’t hesitate to contact us with any questions or comments. Let’s plan better together.
        </div>
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
      </div>
    );
  }
});

export default SignUpForm;

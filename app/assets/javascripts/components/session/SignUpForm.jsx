import ButtonListMixin from '../mixins/ButtonListMixin.jsx';
import Button from '../generic/Button.jsx';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';
import {Link} from 'react-router';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import InvitationActions from '../../actions/InvitationActions';
import InvitationStore from '../../stores/InvitationStore';
import RouteActions from '../../actions/RouteActions';
import ToastActions from '../../actions/ToastActions';
import FormMixin from '../mixins/FormMixin';


var SignUpForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  getInitialState: function() {
    return {
      invitation: null
    };
  },
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
      'invite_token': inputs.invitation_token
    };
  },
  componentDidMount: function() {
    InvitationStore.addChangeListener(this._onInvitationChange);
    if (this.props.query.invite_token) InvitationActions.get(this.props.query.invite_token);
  },
  componentWillUnmount: function() {
    InvitationStore.removeChangeListener(this._onInvitationChange);
  },
  _onInvitationChange() {
    if (InvitationStore.error) {
      this._redirectWithError();
    } else {
      let invitation = InvitationStore.get(this.props.query.invite_token);
      if (invitation && invitation.recipient) this._redirectWithError();
      this.setState({invitation: invitation});
    }
  },
  _redirectWithError() {
    RouteActions.redirect('login');
    ToastActions.toast('Sign up invite may have expired.  If you feel this is an error, please let us know!');
  },
  postForm(data, resetModel, invalidateForm) {
    this.setState({disabled: true});
    SessionActions.signup(data);
  },
  render: function() {
    let invitation = this.state.invitation;
    let email = invitation && invitation.email || null;
    let companyName = invitation && invitation.company && invitation.company.name || null;
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
                validationErrors={this.state.errors}
                resetErrors={this.resetErrors}>
            <FormInput type="hidden" name="invitation_token" value={this.props.query.invite_token}  />
            <FormInput name="email" label="Email*" ref="userEmail" value={email} required/>
            <FormInput name="password" type="password" label="Password*" value={null} required/>
            <FormInput name="password_confirmation" type="password" label="Confirm Password*" value={null} required/>
            <FormInput name="company" type="company" placeholder="Where do you work?" label="Company*" value={companyName} ref="userCompany" required/>
            {this.renderFormButton('Sign up')}
          </Form>
        </div>
      </div>
    );
  }
});

export default SignUpForm;

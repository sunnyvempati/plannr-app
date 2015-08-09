import ButtonListMixin from '../mixins/ButtonListMixin';
import FormButtonList from '../generic/FormButtonList';
import Button from '../generic/Button';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import {Link} from 'react-router';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';
import RouteActions from '../../actions/RouteActions';
import FormMixin from '../mixins/FormMixin';

var LoginForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    disableForm: React.PropTypes.bool
  },
  getInitialState: function() {
    return {
      errors: null
    };
  },
  componentWillMount: function() {
    if (SessionStore.isLoggedIn()) {
      RouteActions.redirect('app');
    }
  },
  mapInputs: function (inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password
    };
  },
  postForm(data, resetModel, invalidateForm) {
    this.setState({disabled: true});
    SessionActions.login(data.email, data.password);
  },
  renderButtonList: function() {
    return (
      <FormButtonList>
        <Link to="signup">
          <Button type="button" className="Button--affirmative" disabled={this.state.disabled}>
            Sign up
          </Button>
        </Link>
        <Link to="reset">
          <Button type="button" className="Button--simple" disabled={this.state.disabled}>
            Reset Password
          </Button>
        </Link>
        <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
          Sign in
        </Button>
      </FormButtonList>
    );
  },
  render: function () {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id='login_form'>
          <FormInput name="email"
                     type='text'
                     validationError="Invalid Email"
                     validations="isEmail"
                     label="Email*"
                     value={null}
                     required />
          <FormInput name="password"
                     type="password"
                     label="Password*"
                     value={null}
                     required />
          {this.renderButtonList()}
        </Form>
      </div>
    );
  }
});

export default LoginForm;

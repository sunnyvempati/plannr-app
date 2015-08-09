import ButtonListMixin from '../mixins/ButtonListMixin.jsx';
import FormButtonList from '../generic/FormButtonList.jsx';
import Button from '../generic/Button.jsx';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';
import {Link} from 'react-router';
import SessionActions from '../../actions/SessionActions.jsx';
import SessionStore from '../../stores/SessionStore.jsx';

var LoginForm = React.createClass({
  mixins: [ButtonListMixin],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    disableForm: React.PropTypes.bool
  },
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },
  mapInputs: function (inputs) {
    return {
      'email': inputs.email,
      'password': inputs.password
    };
  },
  postForm(data, resetModel, invalidateForm) {
    SessionActions.login(data.email, data.password);
  },
  renderButtonList: function() {
    return (
      <FormButtonList>
        <Link to="signup">
          <Button type="button" className="Button--affirmative">
            Sign up
          </Button>
        </Link>
        <Link to="reset">
          <Button type="button" className="Button--simple">
            Reset Password
          </Button>
        </Link>
        <Button type="submit" className="Button--primary">
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


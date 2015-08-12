import ButtonListMixin from '../mixins/ButtonListMixin.jsx';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';
import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import FormMixin from '../mixins/FormMixin';
import SessionStore from '../../stores/SessionStore';

var ResetPasswordRequestForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  componentWillMount: function() {
    if (SessionStore.isLoggedIn()) {
      RouteActions.redirect('app');
    }
  },
  mapInputs: function(inputs) {
    return {
      'email': inputs.email
    };
  },
  onSecondaryClick: function() {
    RouteActions.redirect('login');
  },
  postForm(data, resetModel, invalidateForm) {
    this.setState({disabled: true});
    SessionActions.resetPasswordRequest(data.email);
  },
  render: function() {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id='password_reset_form'
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}>
          <FormInput name="email"
                     label="Email*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Submit Request', 'Back to login')}
        </Form>
      </div>
    );
  }
});

export default ResetPasswordRequestForm;

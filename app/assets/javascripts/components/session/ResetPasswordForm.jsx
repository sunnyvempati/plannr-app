import ButtonListMixin from '../mixins/ButtonListMixin.jsx';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';
import FormMixin from '../mixins/FormMixin';
import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import SessionStore from '../../stores/SessionStore';

var ResetPasswordForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  mapInputs: function(inputs) {
    var token = this.props.query.id;
    return {
      'password_reset': {
        'password': inputs.password,
        'password_confirmation': inputs.password_confirmation
      },
      'id': token
    };
  },
  onSecondaryClick: function() {
    RouteActions.redirect('login');
  },
  postForm(data, resetModel, invalidateForm) {
    this.setState({disabled: true});
    SessionActions.resetPassword(data);
  },
  render: function() {
    return (
      <div className="FormContainer">
        <h2>{this.props.email}</h2>
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}>
          <FormInput name="password"
                     type="password"
                     label="New Password*"
                     value={null}
                     required />
          <FormInput name="password_confirmation"
                     type="password"
                     label="Confirm*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Reset Password', 'Cancel')}
        </Form>
      </div>
    );
  }
});

export default ResetPasswordForm;

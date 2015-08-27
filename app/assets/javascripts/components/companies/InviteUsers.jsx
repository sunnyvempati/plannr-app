import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import UserActions from '../../actions/UserActions';

var InviteUsers = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/invitations',
  mapInputs: function(inputs) {
    return {
      'email': inputs.email
    };
  },
  submitForm(data, reset, invalidateForm) {
    this.refs.inviteEmail.resetValue();
    UserActions.invite(data.email);
  },
  render: function() {
    return (
      <div className="InviteUsersContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.submitForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id="InviteUserForm">
          <FormInput name="email"
                     validationError="Invalid Email"
                     validations="isEmail"
                     label="Email*"
                     ref="inviteEmail"
                     value={null} />
          {this.renderFormButton('Invite')}
        </Form>
      </div>
    );
  }
});

export default InviteUsers;

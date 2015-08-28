import ButtonListMixin from '../mixins/ButtonListMixin';
import FormButtonList from '../generic/FormButtonList';
import Button from '../generic/Button';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import SessionStore from '../../stores/SessionStore';
import SessionActions from '../../actions/SessionActions';

var ProfileForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  url: '/profiles.json',
  mapInputs: function(inputs) {
    return {
      'first_name': inputs.first_name,
      'last_name': inputs.last_name
    };
  },
  postForm(data, resetModel, invalidateForm) {
    this.setState({disabled: true});
    SessionActions.setProfile(data.first_name, data.last_name);
  },
  render: function() {
    return (
      <div className="FormContainer profile">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              authToken={this.props.authToken}>
          <FormInput name="first_name"
                     type="text"
                     label="First Name*"
                     value={null}
                     required
          />
          <FormInput name="last_name"
                     type="text"
                     label="Last Name*"
                     value={null}
                     required
          />
          {this.renderFormButton('Save')}
        </Form>
      </div>
    );
  }
});

export default ProfileForm;

import ButtonListMixin from '../mixins/ButtonListMixin';
import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import ToastActions from '../../actions/ToastActions';
import SessionStore from '../../stores/SessionStore';
import Form from '../generic/Form.jsx';
import FormInput from '../generic/FormInput.jsx';
import FormMixin from '../mixins/FormMixin';

var Verify = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  getInitialState: function() {
    return {
      error: false
    };
  },
  componentDidMount: function() {
    var token = this.props.query.id;
    SessionActions.verify(token);
    SessionStore.addChangeListener(this._onVerifyChange);
  },
  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onVerifyChange);
  },
  _onVerifyChange() {
    if (SessionStore.error) {
      ToastActions.toastError(SessionStore.error);
      this.setState({error: true});
    }
  },
  mapInputs: function(inputs) {
    var token = this.props.query.id;
    return {
      'email': inputs.email
    };
  },
  postForm(data) {
    this.setState({disabled: true});
    SessionActions.resendVerify(data.email);
  },
  onSecondaryClick: function() {
    RouteActions.redirect('login');
  },
  renderForm() {
    return (
      <div className="FormContainer">
        <Form mapping={this.mapInputs}
              onSubmit={this.postForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}>
          <FormInput name="email"
                     label="Email*"
                     value={null}
                     required />
          {this.renderFormTwoButtons('Resend Verification Email', 'Cancel')}
        </Form>
      </div>
    )
  },
  renderVerifying() {
    return (
      <div className="Verification">
        <div className="Verification-text">
          Verifying ...
        </div>
      </div>
    );
  },
  render: function() {
    let render = this.state.error ? this.renderForm() : this.renderVerifying();
    return (
      <div> { render } </div>
    )
  }
});

export default Verify;

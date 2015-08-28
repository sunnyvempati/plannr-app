import FormStore from '../../stores/FormStore';
import FormActions from '../../actions/FormActions';

var FormMixin = {
  getInitialState: function() {
    return {
      disabled: false,
      errors: null
    };
  },
  componentDidMount: function() {
    FormStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FormStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    let errors = FormStore.errors;
    this.setState({errors: FormStore.errors});
    if (!errors && this.onSuccess) this.onSuccess(FormStore.entity);
  },
  enableButton: function() {
    this.setState({disabled: false});
  },
  disableButton: function() {
    this.setState({disabled: true});
  },
  resetErrors: function() {
    this.setState({errors: null});
  }
}

export default FormMixin;

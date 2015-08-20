import ErrorStore from '../../stores/ErrorStore';
import ErrorActions from '../../actions/ErrorActions';

var FormMixin = {
  getInitialState: function() {
    return {
      disabled: false,
      errors: null
    };
  },
  componentDidMount: function() {
    ErrorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ErrorStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    ErrorStore.errors ? this.setState({errors: ErrorState.errors}) : this.formSuccess();
  },
  enableButton: function() {
    this.setState({disabled: false});
  },
  disableButton: function() {
    this.setState({disabled: true});
  },
  resetErrors: function() {
    ErrorActions.reset();
  }
}

export default FormMixin;

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
    this.setState({errors: ErrorStore.errors});
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

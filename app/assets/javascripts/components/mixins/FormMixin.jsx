import SessionStore from '../../stores/SessionStore';

var FormMixin = {
  getInitialState: function() {
    return {
      disabled: false
    };
  },
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      errors: SessionStore.getErrors(),
      disbled: false
    });
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

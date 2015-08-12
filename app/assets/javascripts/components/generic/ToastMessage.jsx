import Toast from './Toast';
import ToastStore from '../../stores/ToastStore';
import ToastActions from '../../actions/ToastActions';

const ToastMessage = React.createClass({
  componentDidMount() {
    ToastStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ToastStore.removeChangeListener(this._onChange);
  },

  _closeToast() {
    React.unmountComponentAtNode(React.findDOMNode(this.refs.toast));
  },

  _mountToast(props) {
    let toast = React.createElement(Toast, props);
    React.render(toast, React.findDOMNode(this.refs.toast));
  },

  _onChange() {
    let message = ToastStore.message;
    console.log(message);
    if (message && !message.loading) {
      let toastProps = {
        message: message.text,
        isError: message.error
      };
      this._mountToast(toastProps);
      setTimeout(this._closeToast, 3000);
    }
  },

  render() {
    return (
      <div ref="toast"></div>
    )
  }
});

export default ToastMessage;

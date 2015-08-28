import Toast from './Toast';
import ToastStore from '../../stores/ToastStore';
import ToastActions from '../../actions/ToastActions';

const Loading = React.createClass({
  componentDidMount() {
    ToastStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ToastStore.removeChangeListener(this._onChange);
  },

  _closeToast() {
    React.unmountComponentAtNode(React.findDOMNode(this.refs.loading));
  },

  _mountToast(props) {
    let toast = React.createElement(Toast, props);
    React.render(toast, React.findDOMNode(this.refs.loading));
  },

  _onChange() {
    let message = ToastStore.message;
    if (message && message.loading) {
      this._mountToast({loading: true});
    } else {
      this._closeToast();
    }
  },

  render() {
    return (
      <div ref="loading"></div>
    )
  }
});

export default Loading;

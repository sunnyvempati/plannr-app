import ModalStore from '../../stores/ModalStore';

const Modal = React.createClass({
  componentDidMount() {
    ModalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ModalStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    if (ModalStore.state == ModalStore.stateTypes.OPEN) {
      this._mount(ModalStore.modal);
    } else this._unmount();
  },

  _unmount() {
    React.unmountComponentAtNode(React.findDOMNode(this.refs.modal));
  },

  _mount(element) {
    React.render(element, React.findDOMNode(this.refs.modal));
  },

  render() {
    return (
      <div ref="modal"></div>
    )
  }
});

export default Modal;

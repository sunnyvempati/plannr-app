import ModalActions from '../../actions/ModalActions';

var MenuFooter = React.createClass({
  openFeedbackModal: function() {
    document.getElementById('menu-trigger').checked = false;
    ModalActions.openFeedbackModal();
  },
  render: function() {
    return (
      <div className="MenuFooter" onClick={this.openFeedbackModal}>
        Leave us feedback
      </div>
    );
  }
});

export default MenuFooter;

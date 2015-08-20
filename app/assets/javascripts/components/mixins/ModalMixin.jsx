const ModalMixin = {
  componentWillMount: function() {
    this.overlayNode = document.createElement('div');
    this.overlayNode.className = 'Overlay';
    document.body.appendChild(this.overlayNode);
    $("body").addClass("u-noScroll");
  },
  closeModal: function() {
    $("#main").removeClass("dialogOpen");
    // bleh don't like this but importing it
    // throws error saying whichever components
    // using this mixin need to implement render
    // which exists here.
    require('../../actions/ModalActions').close();
  },
  componentWillUnmount: function() {
    $("body").removeClass("u-noScroll");
    document.body.removeChild(this.overlayNode);
  },
  renderCloseModal: function() {
    return (
      <div className="Modal-close" onClick={this.closeModal}>
        <div className="Modal-closeIcon"></div>
      </div>
    );
  },
  render: function() {
    return (
      <div className="ModalContainer">
        <div className="Modal-dialog" id="dialog">
          {this.renderModalContent()}
        </div>
      </div>
    );
  }
}

export default ModalMixin;

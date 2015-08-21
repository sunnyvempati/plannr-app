var Modal = {
  componentWillMount: function() {
    this.overlayNode = document.createElement('div');
    this.overlayNode.className = 'Overlay';
    document.body.appendChild(this.overlayNode);
    $("body").addClass("u-noScroll");
  },
  closeModal: function() {
    $("#main").removeClass("dialogOpen");
    React.unmountComponentAtNode(document.getElementById('modal'));
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
  mount: function(props, modalName) {
    var modal = React.createElement(modalName, props);
    React.render(modal, document.getElementById('modal'));
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
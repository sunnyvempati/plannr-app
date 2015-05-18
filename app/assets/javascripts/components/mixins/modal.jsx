var Modal = {
  componentWillMount() {
    this.overlayNode = document.createElement('div');
    this.overlayNode.className = 'Overlay';
    document.body.appendChild(this.overlayNode);
  },
  closeModal: function() {
    $("#main").removeClass("dialogOpen");
    React.unmountComponentAtNode(document.getElementById('modal'));
  },
  componentWillUnmount: function() {
    document.body.removeChild(this.overlayNode);
  },
  render: function() {
    return (
      <div className="ModalContainer">
        <div className="Modal-dialog" id="dialog">
          <div className="Modal-content">
            {this.renderModalContent()}
          </div>
        </div>
      </div>
    );
  }
}

var ShowContactModal = React.createClass({
  mixins: [Modal],
  renderCloseModal: function() {
    return (
      <div className="Modal-close" onClick={this.closeModal}>
        <i className="fa fa-times"></i>
      </div>
    );
  },
  renderModalContent: function() {
    var contact = this.props.data;
    return (
      <div className="ContactModal">
        {this.renderCloseModal()}
        <div className="ContactModal-header">
          <div className="ContactModal-headerIcon">
            <i className="fa fa-user"></i>
          </div>
          <div className="ContactModal-title">
            <h1>{contact.name}</h1>
          </div>
        </div>
        <div className="ContactModal-infoContainer">
          <div className="ContactModal-info">
            <div className="IconWithText">
              <i className="fa fa-envelope"></i>
              {contact.email}
            </div>
            <div className="IconWithText">
              <i className="fa fa-phone"></i>
              {contact.phone}
            </div>
            <div className="IconWithText">
              <i className="fa fa-building"></i>
              {contact.email}
            </div>
          </div>
          <div className="ContactModal-events"></div>
        </div>
      </div>
    )
  }
});

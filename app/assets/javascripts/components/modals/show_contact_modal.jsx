var ShowContactModal = React.createClass({
  mixins: [Modal, ContactCards],
  componentDidMount: function() {
    this.getDetails(this.props.data.id);
  },
  renderCloseModal: function() {
    return (
      <div className="Modal-close" onClick={this.closeModal}>
        <i className="fa fa-times"></i>
      </div>
    );
  },
  renderModalContent: function() {
    var contact = this.state.contact;
    if (contact) {
      var contactHref = "/contacts/#/view/"+contact.id;
      return (
        <div className="ContactModal">
          {this.renderCloseModal()}
          <div className="ContactModal-header">
            <div className="ContactModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="ContactModal-title">
              <h1>
                <a href={contactHref} target="_blank">
                  {this.props.data.name}
                </a>
              </h1>
            </div>
          </div>
          <div className="ContactModal-content">
            {this.renderContactInfo(contact)}
            {this.renderDescription(contact.description)}
          </div>
        </div>
      )
    }
  }
});

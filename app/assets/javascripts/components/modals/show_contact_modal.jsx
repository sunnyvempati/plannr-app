var ShowContactModal = React.createClass({
  mixins: [Modal, ContactCards],
  componentDidMount: function() {
    this.getDetails(this.props.data.id);
  },
  renderModalContent: function() {
    var contact = this.state.contact;
    if (contact) {
      var contactHref = "/contacts/#/view/"+contact.id;
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="EntityModal-title">
              <h1>
                <a href={contactHref} target="_blank">
                  {this.props.data.name}
                </a>
              </h1>
            </div>
          </div>
          <div className="EntityModal-content">
            {this.renderContactInfo(contact)}
            {this.renderDescription(contact.description)}
          </div>
        </div>
      )
    }
  }
});

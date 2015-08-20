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
            <div className="EntityModal-title u-wrapWithEllipsis">
              <a href={contactHref} target="_blank">
                {this.props.data.name}
              </a>
            </div>
          </div>
          <div className="EntityModal-content">
            <div className="EntityModal-card">
              {this.renderContactInfo(contact)}
            </div>
            <div className="EntityModal-card">
              {this.renderDescription(contact.description)}
            </div>
          </div>
        </div>
      )
    }
  }
});
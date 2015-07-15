var CreateContactModal = React.createClass({
  mixins: [Modal],
  onSuccess: function(result) {
    var payload = {event_contact: {contact_id: result.contact.id}};
    Utils.post("contacts", payload, function(result) {
      this.closeModal();
      this.setTimeout(this.props.onAssociation(result.event_contact_with_contact, 100));
    }.bind(this))
  },
  renderModalContent: function() {
    return (
      <div className="EntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-user"></i>
          </div>
          <div className="EntityModal-title">
            <h1>Create Contact</h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <ContactForm
                onSuccess={this.onSuccess}
                authToken={this.props.authToken}
                routeVerb='POST'
                compact={true}
                onSecondaryClick={this.closeModal}
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

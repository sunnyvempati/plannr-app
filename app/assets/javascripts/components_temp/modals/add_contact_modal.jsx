var AddContactModal = React.createClass({
  mixins: [Modal],
  closeAndRefreshData: function() {
    this.closeModal();
    this.props.refreshData();
  },
  renderModalContent: function() {
    return (
      <div className="AddEntityModal">
        {this.renderCloseModal()}
        <div className="EntityModal-header">
          <div className="EntityModal-headerIcon">
            <i className="fa fa-user"></i>
          </div>
          <div className="EntityModal-title">
            <h1>
              Add Contact
            </h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <EventContactAutocomplete
            onAssociation={this.closeAndRefreshData}
            eventId={this.props.eventId}
          />
        </div>
      </div>
    )
  }
});

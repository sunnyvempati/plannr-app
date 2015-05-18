var ShowContactModal = React.createClass({
  mixins: [Modal],
  getInitialState: function() {
    return {
      contactEvents: []
    };
  },
  componentDidMount: function() {
    $.get("contacts/events", {contact_id: this.props.data.id},  function(result) {
      this.setState({contactEvents: result.event_contacts});
    }.bind(this));
  },
  renderCloseModal: function() {
    return (
      <div className="Modal-close" onClick={this.closeModal}>
        <i className="fa fa-times"></i>
      </div>
    );
  },
  getEventRows: function() {
    return this.state.contactEvents.map(function(event) {
      return (
        <div className="Table-row">
          <div className="u-flexGrow-5">
            <i className="fa fa-ticket"></i>
            {event.name}
          </div>
          <div className="u-flexGrow-5">
            {event.start_date}
          </div>
        </div>
      )
    }.bind(this))
  },
  renderModalContent: function() {
    var contact = this.props.data;
    var contactEventsShowClasses = classNames({
      'Panel': true,
      'u-hidden': this.state.contactEvents.length == 0
    });
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
        <div className="ContactModal-content">
          <div className="Panel">
            <div className="Panel-title">
              Contact Info
            </div>
            <div className="Panel-content">
              <div className="IconWithText">
                <i className="fa fa-envelope PanelIcon"></i>
                {contact.email}
              </div>
              <div className="IconWithText">
                <i className="fa fa-phone PanelIcon"></i>
                {contact.phone}
              </div>
              <div className="IconWithText">
                <i className="fa fa-building PanelIcon"></i>
                {contact.organization}
              </div>
            </div>
          </div>
          <div className={contactEventsShowClasses}>
            <div className="Panel-title">Events</div>
            <div className="Panel-content">
              <Table
                useCustomRowComponent={true}
                customRows={this.getEventRows()}
                showToolbar={false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

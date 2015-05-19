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
      // need trailing slash for react router
      var eventHref = "/events/" + event.event_id + "/";
      return (
        <div className="MiniTable-row">
          <div className="MiniTable-rowItem u-flexGrow-1">
            <i className="fa fa-ticket MiniTableIcon"></i>
            <a href={eventHref} target="_blank">{event.name}</a>
          </div>
          <div className="MiniTable-rowItem u-flexGrow-1 u-flexEnd">
            {event.start_date}
          </div>
        </div>
      )
    }.bind(this))
  },
  eventsPanel: function() {
    if (this.state.contactEvents.length > 0) {
      return (
        <div className="Panel">
          <div className="Panel-title">Events</div>
          <div className="Panel-content">
            <div className="MiniTable">
              {this.getEventRows()}
            </div>
          </div>
        </div>
      );
    }
  },
  renderModalContent: function() {
    var contact = this.props.data;
    var emailHref = "mailto:" + contact.email;
    var telHref = "tel:+1" + contact.phone;
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
                <a href={emailHref}>{contact.email}</a>
              </div>
              <div className="IconWithText">
                <i className="fa fa-phone PanelIcon"></i>
                <a href={telHref}>{contact.phone}</a>
              </div>
              <div className="IconWithText">
                <i className="fa fa-building PanelIcon"></i>
                {contact.organization}
              </div>
            </div>
          </div>
          {this.eventsPanel()}
        </div>
      </div>
    )
  }
});

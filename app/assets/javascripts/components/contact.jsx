var Contact = React.createClass({
  mixins: [Router.State, Router.Navigation, ContactCards, AssociatedEvents],
  componentDidMount: function() {
    this.getDetails(this.props.params.id);
    this.getEvents();
  },
  getEvents: function() {
    $.get("/contacts/events", {contact_id: this.props.params.id},  function(result) {
      this.setState({events: result.event_contacts});
    }.bind(this));
  },
  backToList: function() {
    this.transitionTo('contacts');
  },
  renderComments: function() {
    return (
      <div className="Card">
        <div className="Card-title">Comments</div>
        <div className="Card-content">
          <Comments entity="Contact"
                    entity_id={this.props.params.id} />
        </div>
      </div>
    )
  },
  renderContact: function() {
    var contact = this.state.contact;
    if (this.state.contact) {
      return (
        <div>
          <div className="Show-header">
            <div onClick={this.backToList} className="u-clickable">
              <i className="fa fa-arrow-left ShowHeaderIcon"></i>
            </div>
            <div className="Show-name">
              {contact.name}
            </div>
          </div>
          <div className="Show-content">
            <div className="u-flex">
              <div>
                {this.renderContactInfo(this.state.contact)}
                {this.renderDescription(this.state.contact.description)}
                {this.renderEvents()}
              </div>
              {this.renderComments()}
            </div>
          </div>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="Show">
        {this.renderContact()}
      </div>
    );
  }
});

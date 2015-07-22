var Contact = React.createClass({
  mixins: [Router.State, Router.Navigation, ContactCards, AssociatedEvents],
  componentDidMount: function() {
    this.getDetails(this.props.params.id);
    this.getEvents();
  },
  getEvents: function() {
    var params = {
      filter_sort: {
        with_contact_id: this.props.params.id
      }
    };
    $.get("/contact_events.json", params, function(result) {
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
                    entity_id={this.props.params.id}
                    currentUser={this.props.currentUser} />
        </div>
      </div>
    )
  },
  renderContact: function() {
    var contact = this.state.contact;
    if (contact) {
      var editHref = "/contacts/"+contact.id+"/edit";
      return (
        <div>
          <div className="Show-header">
            <div className="Show-nav">
              <div onClick={this.backToList} className="u-clickable">
                <div className="BackIcon"></div>
              </div>
              <div className="Show-name u-wrapWithEllipsis">
                {contact.name}
              </div>
            </div>
            <div className="Show-actions">
              <a href={editHref}>
                <i className="fa fa-pencil ShowHeaderIcon"></i>
              </a>
            </div>
          </div>
          <div className="Show-content">
            <div className="u-flex">
              <div>
                {this.renderContactInfo(contact)}
                {this.renderDescription(contact.description)}
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

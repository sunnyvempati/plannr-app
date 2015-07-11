var EventContactSmallTile = React.createClass({
  mixins: [ToastMessages],
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    var params = {
      filter_sort: {
        with_event_id: this.props.eventId
      }
    };
    $.get("/event_contacts.json", params, function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.event_contacts.length
        })
      }
    }.bind(this))
  },
  incrementCount: function(associatedContact) {
    this.toast(associatedContact.name + " has been added to this event.");
    var count = this.state.count;
    this.setState({count: count+1});
  },
  render: function() {
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="eventContacts" className="Tile-headerLink">
            <div className="Tile-imgContact"></div>
            <div className="Tile-title">Contacts</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            <EventContactAutocomplete
              onAssociation={this.incrementCount}
              eventId={this.props.eventId} />
          </div>
          <div className="TileContent-count">
            {this.state.count}
          </div>
          <div className="TileContent-title">
            Contacts
          </div>
        </div>
      </div>
    );
  }
});

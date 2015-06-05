var EventContactSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("contacts", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.event_contacts.length
        })
      }
    }.bind(this))
  },
  incrementCount: function() {
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
            <EventContactAutocomplete onAssociation={this.incrementCount} />
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

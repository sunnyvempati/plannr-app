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
  render: function() {
    return (
      <div className="EventContactSmallTile">
        <Link to="tileContactsList">Zoom In - Contacts</Link>
        <div className="Tile">
          <div className="Tile-header">
          <Link to="tileContacts">Contacts</Link>
        </div>
        <div className="Tile-content">
          {this.state.count + " Contacts"}
        </div>
      </div>
    );
  }
});

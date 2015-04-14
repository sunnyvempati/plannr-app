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
        <Link to="tileContacts">Zoom Contacts</Link>
        <ObjectCount count={this.state.count} text='Contacts' />
      </div>
    );
  }
});

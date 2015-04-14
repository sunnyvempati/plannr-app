var EventContactSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("contacts/count", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results
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

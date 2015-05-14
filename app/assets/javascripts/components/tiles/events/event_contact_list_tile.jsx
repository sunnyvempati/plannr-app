var EventContactListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    $.get("contacts", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.event_contacts
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="TileContainer">
      </div>
    );
  }
});

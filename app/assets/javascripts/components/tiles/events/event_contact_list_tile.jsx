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
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <EventContactsTable data={this.state.tableData} onUpdatedData={this.updateData} />
    );
  }
});

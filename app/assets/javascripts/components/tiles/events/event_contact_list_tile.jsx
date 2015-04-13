var EventContactListTile = React.createClass({
  getInitialState: function() {
    var initial = {
      tableData: [],
      checkedContacts: []
    };
    return initial;
  },
  componentDidMount: function() {
    $.get("contacts", function(results) {
      this.setState({
        tableData: results.event_contacts
      })
    }.bind(this))
  },
  addToContactList: function(item) {
    var tableData = this.state.tableData;
    tableData.push({name: item.name, email: item.email, id: item.id});
    this.setState({tableData: tableData});
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    var eventId = this.props.eventId;
    console.log(this.state.tableData);
    return (
      <div className="EventContactListTileContainer">
        <Link to="tileAll">Go back to home</Link>
        <EventContactAutocomplete onAssociation={this.addToContactList} />
        <EventContactsTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});

var EventContactListTile = React.createClass({
  propTypes: {
    eventId: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    var initial = {
      tableData: [],
      checkedContacts: []
    };
    return initial;
  },
  componentDidMount: function() {
    var eventId = this.props.eventId;
    var url = "/events/" + eventId + "/contacts";
    $.get(url, {event_id: eventId}, function(results) {
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
    return (
      <div className="EventContactListTileContainer">
        <EventContactAutocomplete onAssociation={this.addToContactList} eventId={eventId} />
        <EventContactsTable eventId={eventId} data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});
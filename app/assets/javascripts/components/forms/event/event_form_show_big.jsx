var EventFormShowBig = React.createClass({
  getInitialState: function() {
    var initial = {
      tableData: [],
      checkedContacts: []
    };
    return initial;
  },
  componentDidMount: function() {
    var url = "/events/" + this.props.model.id + "/event_contacts";
    $.get(url, function(results) {
      this.setState({
        tableData: results.contacts
      })
    }.bind(this))
  },

  addToContactList: function(item) {
    var tableData = this.state.tableData;
    tableData.push({name: item.name, email: item.email, id: item.contact_id});
    this.setState({tableData: tableData});
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function () {
    var event = this.props.model;
    return (
      <div>
        <EventContactAutocomplete onAssociation={this.addToContactList} eventId={event.id} />
        <EventContactsTable eventId={event.id} data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});

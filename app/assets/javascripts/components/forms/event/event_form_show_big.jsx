var EventFormShowBig = React.createClass({
  getInitialState: function() {
    var initial = {
      tableData: []
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
  getColumns: function() {
    return [
      {name: "name", header: "Name", grow: 1},
      {name: "email", header: "Email", grow: 1}
    ];
  },
  addToContactList: function(item) {
    var tableData = this.state.tableData;
    tableData.push({name: item.name, email: item.email, id: item.contact_id});
    this.setState({tableData: tableData});
  },
  render: function () {
    var event = this.props.model;
    return (
      <div>
        <EventContactAutocomplete onAssociation={this.addToContactList} eventId={event.id} />
        <Table results={this.state.tableData}
               columns={this.getColumns()}
               checkbox={true}
               useCustomRowComponent={false} />
      </div>


    );
  }
});

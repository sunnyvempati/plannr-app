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
      <div className="EventContactListTileContainer">
        <Link to="tileAll"><i className="fa fa-arrow-left"></i></Link>
        <EventContactsTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});

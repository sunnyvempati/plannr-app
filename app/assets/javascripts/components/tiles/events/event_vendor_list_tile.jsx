var EventVendorListTile = React.createClass({
  getInitialState: function() {
    var initial = {
      tableData: [],
      checkedContacts: []
    };
    return initial;
  },
  componentDidMount: function() {
    $.get("vendors", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.event_vendors
        })
      }
    }.bind(this))
  },
  addToContactList: function(item) {
    var tableData = this.state.tableData;
    tableData.push({name: item.name, id: item.id});
    this.setState({tableData: tableData});
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <div className="EventVendorListTile">
        <Link to="tileAll">Zoom Out</Link>
        <EventContactAutocomplete onAssociation={this.addToContactList} />
        <Link to='tileNewVendor'>New Event Vendor</Link>
        <EventVendorsTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});

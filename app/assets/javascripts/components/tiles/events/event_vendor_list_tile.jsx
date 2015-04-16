var EventVendorListTile = React.createClass({
  getInitialState: function() {
    return {
      tableData: []
    };
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
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <div className="EventVendorListTile">
        <Link to="tileAll">Zoom Out</Link>
        <EventVendorsTable data={this.state.tableData} onUpdatedData={this.updateData} />
        <Link to='tileNewVendor' >New Event Vendor</Link>
      </div>
    );
  }
});

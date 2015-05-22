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
      <div>
        <ActionButton class="ActionButton-vendors" path="/vendors/new" label="Create Vendor" prerender="true" />
        <EventVendorsTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>
    );
  }
});

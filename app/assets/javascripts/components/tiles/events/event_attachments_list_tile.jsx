var EventAttachmentsListTile = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function() {
    return {
      tableData: []
    };
  },
  componentDidMount: function() {
    $.get("attachments", function(results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.attachments
        })
      }
    }.bind(this))
  },
  updateData: function(data) {
    this.setState({tableData: data});
  },
  render: function() {
    return (
      <EventAttachmentsTable data={this.state.tableData} onUpdatedData={this.updateData} />
    );
  }
});

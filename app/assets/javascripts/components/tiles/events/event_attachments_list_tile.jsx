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
      <div>
        <ActionButton class="ActionButton-attachment" path="/attachments/new" label="Create Attachment" prerender="true" />
        <EventAttachmentsTable data={this.state.tableData} onUpdatedData={this.updateData} />
      </div>

    );
  }
});

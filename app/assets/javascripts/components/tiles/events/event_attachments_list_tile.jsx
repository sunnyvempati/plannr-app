var EventAttachmentsListTile = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function () {
    return {
      tableData: []
    };
  },
  componentDidMount: function () {
    this.retrieveData();
  },
  retrieveData: function (){
    $.get("attachments", function (results) {
      if (this.isMounted()) {
        this.setState({
          tableData: results.attachments
        })
      }
    }.bind(this))
  },
  updateData: function (data) {
    this.setState({tableData: data});
  },
  //TODO: more descriptive name - onAddCallback?
  onAssociation: function () {
    this.retrieveData();
  },
  render: function () {
    return (
        <div>
          <AttachmentActionButtonUploadIcon eventId={this.props.eventId}
                                            onAssociation={this.onAssociation}/>
          <EventAttachmentsTable data={this.state.tableData} onUpdatedData={this.updateData}/>
        </div>

    );
  }
});

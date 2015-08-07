var EventAttachmentsSmallTile = React.createClass({
  getInitialState: function () {
    return {
      count: null
    };
  },
  componentDidMount: function () {
    var params = {
      filter_sort: {
        with_event_id: this.props.eventId
      }
    };
    $.get("/attachments.json", params, function (results) {
      if (this.isMounted()) {
        this.setState({
          count: results.attachments.length
        })
      }
    }.bind(this))
  },
  incrementCount: function (attachment) {
    ToastMessages.toast(attachment.file_name + " has been added to this event.");
    var count = this.state.count;
    this.setState({count: count + 1});
  },
  getActionButtonClickableElement: function () {
    return (
      <button className='Button Button--raised Button--primary'>Browse</button>
    );
  },
  getBrowseButton: function () {
    return (
      <AttachmentBrowse clickableElement={this.getActionButtonClickableElement()}
                        onAssociation={this.incrementCount}/>
    );
  },
  render: function () {
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="eventAttachments" className="Tile-headerLink">
            <div className="Tile-imgAttachment"></div>
            <div className="Tile-title">Attachments</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            {this.getBrowseButton()}
          </div>
          <div className="TileContent-count">
            {this.state.count}
          </div>
          <div className="TileContent-title">
            Attachments
          </div>
        </div>
      </div>
    );
  }
});

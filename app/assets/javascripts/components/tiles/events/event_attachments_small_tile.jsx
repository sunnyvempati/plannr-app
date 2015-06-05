var EventAttachmentsSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("attachments", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results.attachments.length
        })
      }
    }.bind(this))
  },
  incrementCount: function() {
    var count = this.state.count;
    this.setState({count: count+1});
  },
  render: function() {
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
            <AttachmentActionButtonUploadBrowse eventId={this.props.eventId} onAssociation={this.incrementCount} />
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

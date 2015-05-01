var EventAttachmentsSmallTile = React.createClass({
  render: function() {
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="tileAttachmentsList" className="Tile-headerLink">
            <div className="Tile-imgAttachment"></div>
            <div className="Tile-title">Attachments</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="Tile-status">
            Under Construction
          </div>
        </div>
      </div>
    );
  }
});

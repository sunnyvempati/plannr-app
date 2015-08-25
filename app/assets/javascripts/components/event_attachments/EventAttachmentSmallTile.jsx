import {Link} from 'react-router';
import AttachmentBrowse from './AttachmentBrowse';
import AttachmentActions from '../../actions/AttachmentActions';
import EventAttachmentStore from '../../stores/EventAttachmentStore';

var EventAttachmentSmallTile = React.createClass({
  getInitialState: function () {
    return {
      eventAttachments: null
    };
  },
  componentDidMount: function () {
    EventAttachmentStore.addChangeListener(this._onEventAttachmentsRetrieved);
    this.getEventAttachmentState();
  },
  componentWillUnmount() {
    EventAttachmentStore.removeChangeListener(this._onEventAttachmentsRetrieved);
  },
  _onEventAttachmentsRetrieved() { this.getEventAttachmentState(); },
  getEventAttachmentState() {
    let params = {with_event_id: this.props.eventId};
    let eventAttachmentsCached = EventAttachmentStore.isCached(params);
    if (eventAttachmentsCached) this.setState({eventAttachments: EventAttachmentStore.getFromCache(params)});
    else AttachmentActions.getAttachments(params);
  },
  getActionButtonClickableElement: function () {
    return (
      <button className='Button Button--raised Button--primary'>Browse</button>
    );
  },
  getBrowseButton: function () {
    return (
      <AttachmentBrowse clickableElement={this.getActionButtonClickableElement()}
                        onAssociation={this.incrementCount}
                        eventId={this.props.eventId} />
    );
  },
  render: function () {
    let eventAttachments = this.state.eventAttachments;
    return (
      <div className="Tile">
        <div className="Tile-header">
          <Link to="event_attachments" className="Tile-headerLink" params={{id: this.props.eventId}}>
            <div className="Tile-imgAttachment"></div>
            <div className="Tile-title">Attachments</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            {this.getBrowseButton()}
          </div>
          <div className="TileContent-count">
            {eventAttachments && eventAttachments.length || 0}
          </div>
          <div className="TileContent-title">
            Attachments
          </div>
        </div>
      </div>
    );
  }
});

export default EventAttachmentSmallTile;

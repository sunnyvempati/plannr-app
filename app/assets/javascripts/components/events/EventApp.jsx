import EventTaskSmallTile from '../event_tasks/EventTaskSmallTile';
import EventContactSmallTile from '../event_contacts/EventContactSmallTile';
import EventAttachmentSmallTile from '../event_attachments/EventAttachmentSmallTile';
import EventVendorSmallTile from '../event_vendors/EventVendorSmallTile';

var EventApp = React.createClass({
  render: function() {
    return (
      <div className="EventHomeTileContainer">
        <div className="EventHome-row">
          <EventTaskSmallTile eventId={this.props.params.id} />
          <EventContactSmallTile eventId={this.props.params.id} />
        </div>
        <div className="EventHome-row">
          <EventAttachmentSmallTile eventId={this.props.params.id} />
          <EventVendorSmallTile eventId={this.props.params.id} />
        </div>
      </div>
    );
  }
});

export default EventApp;

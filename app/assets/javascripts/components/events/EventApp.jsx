import EventTaskSmallTile from '../event_tasks/EventTaskSmallTile';
// import EventContactSmallTile from './EventContactSmallTile';
// import EventAttachmentSmallTile from './EventAttachmentSmallTile';
// import EventVendorSmallTile from './EventVendorSmallTile';

var EventApp = React.createClass({
  render: function() {
    return (
      <div className="EventHomeTileContainer">
        <div className="EventHome-row">
          <EventTaskSmallTile eventId={this.props.params.id} />
        </div>
        <div className="EventHome-row">
          blah
        </div>
      </div>
    );
  }
});

export default EventApp;

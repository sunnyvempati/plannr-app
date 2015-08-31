import EventVendorActions from '../../actions/EventVendorActions';
import EventVendorStore from '../../stores/EventVendorStore';
import EventVendorAutocomplete from './EventVendorAutocomplete';
import {Link} from 'react-router';

var EventVendorSmallTile = React.createClass({
  getInitialState: function() {
    return {
      eventVendors: null
    };
  },
  componentDidMount: function () {
    EventVendorStore.addChangeListener(this._onEventVendorsRetrieved);
    this.getEventVendorState();
  },
  componentWillUnmount() {
    EventVendorStore.removeChangeListener(this._onEventVendorsRetrieved);
  },
  _onEventVendorsRetrieved() {
    this.getEventVendorState();
  },
  getEventVendorState: function() {
    var params = {with_event_id: this.props.eventId};
    let eventVendorsCached = EventVendorStore.isCached(params);
    if (eventVendorsCached) this.setState({eventVendors: EventVendorStore.getFromCache(params)});
    else EventVendorActions.getEventVendors(params);
  },
  render: function() {
    let eventVendors = this.state.eventVendors;
    return (
      <div className="Tile">
        <div className="Tile-header vendors">
          <Link to="event_vendors" params={{id: this.props.eventId}} className="Tile-headerLink">
            <div className="Tile-imgVendor"></div>
            <div className="Tile-title">Vendors</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            <EventVendorAutocomplete eventId={this.props.eventId} />
          </div>
          <div className="TileContent-count">
            {eventVendors && eventVendors.length || 0}
          </div>
          <div className="TileContent-title">
            Vendors
          </div>
        </div>
      </div>
    );
  }
});

export default EventVendorSmallTile;

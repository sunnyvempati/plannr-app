import EventContactActions from '../../actions/EventContactActions';
import EventContactStore from '../../stores/EventContactStore';
import EventContactAutocomplete from './EventContactAutocomplete';
import {Link} from 'react-router';

var EventContactSmallTile = React.createClass({
  getInitialState: function() {
    return {
      eventContacts: null
    };
  },
  componentDidMount: function () {
    EventContactStore.addChangeListener(this._onEventContactsRetrieved);
    this.getEventContactState();
  },
  componentWillUnmount() {
    EventContactStore.removeChangeListener(this._onEventContactsRetrieved);
  },
  _onEventContactsRetrieved() {
    this.getEventContactState();
  },
  getEventContactState: function() {
    var params = {with_event_id: this.props.eventId};
    let eventContactsCached = EventContactStore.isCached(params);
    if (eventContactsCached) this.setState({eventContacts: EventContactStore.getFromCache(params)});
    else EventContactActions.getEventContacts(params);
  },
  render: function() {
    let eventContacts = this.state.eventContacts;
    return (
      <div className="Tile">
        <div className="Tile-header contacts">
          <Link to="event_contacts" params={{id: this.props.eventId}} className="Tile-headerLink">
            <div className="Tile-imgContact"></div>
            <div className="Tile-title">Contacts</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-quickAdd">
            <EventContactAutocomplete eventId={this.props.eventId} />
          </div>
          <div className="TileContent-count">
            {eventContacts && eventContacts.length || 0}
          </div>
          <div className="TileContent-title">
            Contacts
          </div>
        </div>
      </div>
    );
  }
});

export default EventContactSmallTile;

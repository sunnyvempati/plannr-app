import ContactStore from '../../stores/ContactStore';
import ContactActions from '../../actions/ContactActions';
import EventContactStore from '../../stores/EventContactStore';
import EventContactActions from '../../actions/EventContactActions';
import RouteActions from '../../actions/RouteActions';
import ContactCards from './ContactCards';
import AssociatedEventsCard from '../mixins/AssociatedEventsCard';
import {Link} from 'react-router';
import Comments from '../comments/Comments';

var Contact = React.createClass({
  mixins: [ContactCards, AssociatedEventsCard],
  getInitialState: function() {
    return {
      contact: null,
      events: [],
    };
  },
  componentDidMount: function() {
    ContactStore.addChangeListener(this._onContactChange);
    EventContactStore.addChangeListener(this._onEventContactChange);
    this.getData();
  },
  componentWillUnmount() {
    ContactStore.removeChangeListener(this._onContactChange);
    EventContactStore.removeChangeListener(this._onEventContactChange);
  },
  _onContactChange() {
    this.setState({contact: ContactStore.get(this.props.params.id)});
  },
  _onEventContactChange() {
    let params = {with_contact_id: this.props.params.id};
    this.setState({
      events: EventContactStore.getFromCache(params)
    });
  },
  getData() {
    let id = this.props.params.id;
    let params = {with_contact_id: id};
    let contact = ContactStore.get(id);
    let eventContactsRetrieved = EventContactStore.isCached(params);
    if (contact) this.setState({contact: contact});
    else ContactActions.get(id);
    if (eventContactsRetrieved) {
      this.setState({
        eventsForContact: EventContactStore.getFromCache(params)
      });
    } else EventContactActions.getEventContacts(params);
  },
  backToList: function() {
    RouteActions.redirect('contacts');
  },
  renderComments: function() {
    return (
      <div className="Card">
        <div className="Card-title">Comments</div>
        <div className="Card-content">
          <Comments entity="Contact"
                    entity_id={this.props.params.id} />
        </div>
      </div>
    )
  },
  renderContact: function() {
    var contact = this.state.contact;
    if (contact) {
      return (
        <div>
          <div className="Show-header is-contact">
            <div className="Show-nav">
              <div onClick={this.backToList} className="u-clickable">
                <div className="BackIcon"></div>
              </div>
              <div className="Show-name u-wrapWithEllipsis">
                {contact.name}
              </div>
            </div>
            <div className="Show-actions">
              <Link to='contact_edit' params={{id: contact.id}}>
                <i className="fa fa-pencil ShowHeaderIcon"></i>
              </Link>
            </div>
          </div>
          <div className="Show-content">
            <div className="u-flex">
              <div>
                {this.renderContactInfo(contact)}
                {this.renderDescription(contact.description)}
                {this.renderEvents()}
              </div>
              {this.renderComments()}
            </div>
          </div>
        </div>
      )
    }
  },
  render: function() {
    return (
      <div className="Show">
        {this.renderContact()}
      </div>
    );
  }
});

export default Contact;

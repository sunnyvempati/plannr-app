import VendorStore from '../../stores/VendorStore';
import VendorActions from '../../actions/VendorActions';
import EventVendorStore from '../../stores/EventVendorStore';
import EventVendorActions from '../../actions/EventVendorActions';
import RouteActions from '../../actions/RouteActions';
import VendorCards from './VendorCards';
import AssociatedEventsCard from '../mixins/AssociatedEventsCard';
import {Link} from 'react-router';
import Comments from '../comments/Comments';

var Vendor = React.createClass({
  mixins: [VendorCards, AssociatedEventsCard],
  getInitialState: function() {
    return {
      vendor: null,
      eventsForVendor: [],
    };
  },
  componentDidMount: function() {
    VendorStore.addChangeListener(this._onVendorChange);
    EventVendorStore.addChangeListener(this._onEventVendorChange);
    this.getData();
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onVendorChange);
    EventVendorStore.removeChangeListener(this._onEventVendorChange);
  },
  _onVendorChange() {
    this.setState({vendor: VendorStore.get(this.props.params.id)});
  },
  _onEventVendorChange() {
    let params = {with_vendor_id: this.props.params.id};
    this.setState({
      events: EventVendorStore.getFromCache(params)
    });
  },
  getData() {
    let id = this.props.params.id;
    let params = {with_vendor_id: id};
    let vendor = VendorStore.get(id);
    let eventVendorsRetrieved = EventVendorStore.isCached(params);
    if (vendor) this.setState({vendor: vendor});
    else VendorActions.get(id);
    if (eventVendorsRetrieved) {
      this.setState({
        events: EventVendorStore.getFromCache(params)
      });
    } else EventVendorActions.getEventVendors(params);
  },
  backToList: function() {
    RouteActions.redirect('vendors');
  },
  renderComments: function() {
    return (
      <div className="Card">
        <div className="Card-title">Comments</div>
        <div className="Card-content">
          <Comments entity="Vendor"
                    entity_id={this.props.params.id} />
        </div>
      </div>
    )
  },
  renderVendor: function() {
    var vendor = this.state.vendor;
    if (vendor) {
      return (
        <div>
          <div className="Show-header">
            <div className="Show-nav">
              <div onClick={this.backToList} className="u-clickable">
                <div className="BackIcon"></div>
              </div>
              <div className="Show-name u-wrapWithEllipsis">
                {vendor.name}
              </div>
            </div>
            <div className="Show-actions">
              <Link to='vendor_edit' params={{id: vendor.id}}>
                <i className="fa fa-pencil ShowHeaderIcon"></i>
              </Link>
            </div>
          </div>
          <div className="Show-content">
            <div className="u-flex">
              <div>
                {this.renderVendorInfo(vendor)}
                {this.renderDescription(vendor.description)}
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
        {this.renderVendor()}
      </div>
    );
  }
});

export default Vendor;

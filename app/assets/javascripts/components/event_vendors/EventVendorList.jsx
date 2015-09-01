import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import ModalActions from '../../actions/ModalActions';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import EventVendorActions from '../../actions/EventVendorActions';
import EventVendorStore from '../../stores/EventVendorStore';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import FormStore from '../../stores/FormStore';

var EventVendorList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'vendor_name_asc'},
      filter: {with_event_id: this.props.params.id}
    }
  },
  componentDidMount() {
    // this.props.setLayoutParams({header: "Contacts", skrollable: true});
    EventVendorStore.addChangeListener(this._onViewEventVendorsChange);
    FormStore.addChangeListener(this._onFormChange);
  },
  componentDidUpdate: function() {
    if (!EventVendorStore.eventVendorsLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    EventVendorStore.removeChangeListener(this._onViewEventVendorsChange);
    FormStore.removeChangeListener(this._onFormChange);
  },
  _onViewEventVendorsChange() {
    this.setState({data: EventVendorStore.viewEventVendors});
  },
  _onFormChange() {
    if (!FormStore.errors) {
      ModalActions.close();
      this.resetPageAndFetch();
    }
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (EventVendorStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      EventVendorStore.addCachedEventVendorsToView(params);
      this.setState({data: EventVendorStore.viewEventVendors});
    } else EventVendorActions.getEventVendors(params);
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "location", grow: 10, header: "Location"}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove", handler: this.removeAssociation, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "vendor_name", display: "Name", default: true}
    ]
  },
  removeAssociation: function(id) {
    let deletionIds = !!id ? [id] : this.state.checkedItems;
    EventVendorActions.remove(deletionIds);
    this.setState({checkedItems: []});
  },
  openVendorModal: function(data) {
    var props = { id: data.id };
    ModalActions.openShowVendorModal(props);
  },
  openAddModal: function() {
    var props = {eventId: this.props.params.id};
    ModalActions.openAddVendorModal(props);
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openAddModal}
                    svgClass='createVendor'
                    extraPad={false} />
    );
  },
  render: function() {
    return (
      <div className="EventTableContainer">
        <div className="Table-sidebarContainer">
          <div className="SideBarIconWithName u-clickable" onClick={this.openCreateTaskModal}>
            <i className="fa fa-plus Nav-icon"></i>
            <div className="Nav-name">Add New</div>
          </div>
        </div>
        <Table
          results={this.state.data}
          columns={this.getColumns()}
          useCustomRowComponent={false}
          showHeaders={true}
          checkedItems={this.state.checkedItems}
          rowChanged={this.rowChanged}
          sortItems={this.sortItems()}
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={false}
          searchPlaceholder="Search Vendors..."
          onClick={this.openVendorModal}
          actionButton={this.getActionButton()}
          handleCheckAllChanged={this.toggleCheckAll}
          invertToolbarColors={false}
        />
      </div>
    );
  }
});

export default EventVendorList;

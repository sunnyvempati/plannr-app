import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import VendorActions from '../../actions/VendorActions';
import VendorStore from '../../stores/VendorStore';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';

const VendorList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'name_asc'}
    };
  },
  componentDidMount() {
    // this.props.setLayoutParams({header: "Vendors", skrollable: true});
    VendorStore.addChangeListener(this._onViewVendorsChange);
  },
  componentDidUpdate: function() {
    if (!VendorStore.vendorsLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    VendorStore.removeChangeListener(this._onViewVendorsChange);
  },
  _onViewVendorsChange() {
    this.setState({data: VendorStore.viewVendors});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (VendorStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      VendorStore.addCachedVendorsToView(params);
      this.setState({data: VendorStore.viewVendors});
    } else VendorActions.getVendors(params);
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "location", grow: 10, header: "Location"},
      {name: "phone", grow: 5, header: "Phone"},
    ];
  },
  actionItems: function() {
    return [
      // global means the action is available as a mass action
      {name: "Edit", handler: this.handleEdit, massAction: false},
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true}
    ]
  },
  handleActionButtonClick: function() {
    // to do
    // RouteActions.redirect('events_new');
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Add Vendor'
                    svgClass='createVendor'
                    extraPad={false} />
    );
  },
  goToVendor: function(data) {
    // to do
    // this.transitionTo('vendor', {id: data.id, currentUser: this.props.currentUser});
  },
  render: function() {
    return (
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
        extraPadding={true}
        searchPlaceholder="Search Vendors..."
        onClick={this.goToVendor}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});

export default VendorList;

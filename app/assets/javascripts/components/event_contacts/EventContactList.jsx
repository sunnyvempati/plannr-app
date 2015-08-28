import RouteActions from '../../actions/RouteActions';
import SessionActions from '../../actions/SessionActions';
import ModalActions from '../../actions/ModalActions';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import EventContactActions from '../../actions/EventContactActions';
import EventContactStore from '../../stores/EventContactStore';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import FormStore from '../../stores/FormStore';

var EventContactList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'contact_name_asc'},
      filter: {with_event_id: this.props.params.id}
    }
  },
  componentDidMount() {
    EventContactStore.addChangeListener(this._onViewEventContactsChange);
    FormStore.addChangeListener(this._onFormChange);
  },
  componentDidUpdate: function() {
    if (!EventContactStore.eventContactsLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    EventContactStore.removeChangeListener(this._onViewEventContactsChange);
    FormStore.removeChangeListener(this._onFormChange);
  },
  _onViewEventContactsChange() {
    this.setState({data: EventContactStore.viewEventContacts});
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
    if (EventContactStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      EventContactStore.addCachedEventContactsToView(params);
      this.setState({data: EventContactStore.viewEventContacts});
    } else EventContactActions.getEventContacts(params);
  },
  getColumns: function() {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "email", grow: 10, header: "Email"},
      {name: "phone", grow: 5, header: "Phone"},
      {name: "company", grow: 10, header: "Company"},
      {name: "type", grow: 5, header: "Type"}
    ];
  },
  removeAssociation: function(id) {
    let deletionIds = !!id ? [id] : this.state.checkedItems;
    EventContactActions.remove(deletionIds);
    this.setState({checkedItems: []});
  },
  actionItems: function() {
    return [
      {name: "Remove", handler: this.removeAssociation, massAction: true}
    ]
  },
  sortItems: function() {
    return [
      {entity: "contact_name", display: "Name", default: true},
      {entity: "email", display: "Email"}
    ]
  },
  openContactModal: function(data) {
    var props = { id: data.id };
    ModalActions.openShowContactModal(props);
  },
  openAddModal: function() {
    var props = {eventId: this.props.params.id};
    ModalActions.openAddContactModal(props);
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.openAddModal}
                    svgClass='createContact'
                    extraPad={false} />
    );
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
        extraPadding={false}
        searchPlaceholder="Search Contacts..."
        onClick={this.openContactModal}
        actionButton={this.getActionButton()}
        handleCheckAllChanged={this.toggleCheckAll}
      />
    );
  }
});

export default EventContactList;

import RouteActions from '../../actions/RouteActions';
import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import EventRow from './EventRow';

const EventList = React.createClass({
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
    this.props.setLayoutParams({header: "Events", skrollable: true});
    EventStore.addChangeListener(this._onViewEventsChange);
  },
  componentDidUpdate: function() {
    if (!EventStore.eventsLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onViewEventsChange);
  },
  _onViewEventsChange() {
    this.setState({data: EventStore.viewEvents});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (EventStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      EventStore.addCachedEventsToView(params);
      this.setState({data: EventStore.viewEvents});
    } else EventActions.getEvents(params);
  },
  getCustomRows: function() {
    return this.state.data.map(function(event) {
      return(
        <EventRow
          event={event}
          checkedItems={this.state.checkedItems}
          actionItems={this.actionItems()}
          rowChanged={this.rowChanged}
          refreshData={this.resetPage}
          key={event.id}
        />
      );
    }, this);
  },
  sortItems: function() {
    return [
      {entity: "name", display: "Name", default: true},
      {entity: "start_date", display: "Start Date"}
    ]
  },
  filterItems: function () {
    return [
      {name: "All Events", handler: this.filter.bind(this, {}), default: true},
      {name: "Active Events", handler: this.filter.bind(this, {with_status: 1})},
      {name: "Archived Events", handler: this.filter.bind(this, {with_status: 2})}
    ]
  },
  handleDelete: function(id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    EventActions.deleteEvents(deletionIds);
    this.setState({checkedItems: []});
  },
  actionItems: function() {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  handleActionButtonClick: function() {
    RouteActions.redirect('events_new');
  },
  getActionButton: function () {
    return (
      <ActionButton handleClick={this.handleActionButtonClick}
                    label='Create Event'
                    svgClass='createEvent'
                    extraPad={true} />
    );
  },
  render: function() {
    return (
      <div className="EventsTableContainer">
        <Table
          useCustomRowComponent={true}
          customRows={this.getCustomRows()}
          sortItems={this.sortItems()}
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={true}
          filterable={true}
          filterItems={this.filterItems()}
          searchPlaceholder="Search Events..."
          actionButton={this.getActionButton()}
          handleCheckAllChanged={this.toggleCheckAll}
        />
      </div>
    );
  }
});

export default EventList;

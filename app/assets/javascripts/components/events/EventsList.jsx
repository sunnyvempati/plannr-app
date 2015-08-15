import RouteActions from '../../actions/RouteActions';
import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import EventRow from './EventRow';

const EventsList = React.createClass({
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
    EventStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    EventStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    let events = EventStore.getEvents();
    if (events.length == 0) { this.detachScrollListener(); return; }
    this.setState({data: events});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    var params = this.mergeParams();
    EventActions.getEvents(params);
  },
  getCustomRows: function() {
    return this.state.data.map(function(event) {
      return(
        <EventRow
          event={event}
          checkedItems={this.state.checkedItems}
          actionItems={this.actionItems()}
          rowChanged={this.rowChanged}
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

    // Utils.post("/destroy_events", destroyOpts, function(result) {
    //   this.setState({data: this.spliceResults(this.state.data, deletionIds), checkedItems: []});
    //   this.toast(deletionIds.length + " events deleted successfully.");
    // }.bind(this));

    // to do delete
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

export default EventsList;

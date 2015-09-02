import RouteActions from '../../actions/RouteActions';
import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';
import TableCheckbox from '../mixins/TableCheckbox';
import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import TaskCheckboxRows from '../tasks/TaskCheckboxRows';
import SessionStore from '../../stores/SessionStore';

var EventTaskList = React.createClass({
  mixins: [
    TaskCheckboxRows,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'deadline_asc'},
      filter: {with_status: 1, with_event_id: this.props.params.id}
    };
  },
  componentDidMount() {
    // this.props.setLayoutParams({header: "Tasks", skrollable: true});
    TaskStore.addChangeListener(this._onViewTasksChange);
  },
  componentDidUpdate: function() {
    if (!TaskStore.tasksLoaded || this.nextPage == 1) this.attachScrollListener();
  },
  componentWillUnmount() {
    TaskStore.removeChangeListener(this._onViewTasksChange);
  },
  _onViewTasksChange() {
    this.setState({data: TaskStore.viewTasks});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (TaskStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      TaskStore.addCachedTasksToView(params);
      this.setState({data: TaskStore.viewTasks});
    } else TaskActions.getTasks(params);
  },
  getColumns: function () {
    return [
      {name: "name", grow: 10, header: "Name"},
      {name: "deadline_icon", grow: 1, header: ""},
      {name: "deadline", grow: 4, header: "Due Date"},
      {name: "status", grow: 4, header: "Status"},
      {name: "assigned_to", grow: 4, header: "Assigned to"}
    ];
  },
  actionItems: function () {
    return [
      {name: "Edit", handler: this.openEditModal},
      {name: "Delete", handler: this.handleDelete}
    ]
  },
  sortItems: function () {
    return [
      {entity: "deadline", display: "Due Date", default: true},
      {entity: "name", display: "Name"},
      {entity: "status", display: "Status"}
    ]
  },
  filterWithEvent: function(params) {
    $.extend(params, {with_event_id: this.props.params.id});
    this.filter(params);
  },
  filterItems: function () {
    return [
      {name: "All Tasks - To do", handler: this.filterWithEvent.bind(this, {with_status: 1}), default: true},
      {name: "All Tasks - Completed", handler: this.filterWithEvent.bind(this, {with_status: 2})},
      {name: "My Tasks - To do", handler: this.filterWithEvent.bind(this, {with_status: 1, with_assigned_to: SessionStore.userId})},
      {name: "My Tasks - Completed", handler: this.filterWithEvent.bind(this, {with_status: 2, with_assigned_to: SessionStore.userId})},
    ]
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
          columns={this.getColumns()}
          showHeaders={true}
          useCustomRowComponent={true}
          customRows={this.getCustomRows(false, this.goToTask)}
          sortItems={this.sortItems()}
          handleSortClick={this.sort}
          handleSearch={this.search}
          showActions={false}
          extraPadding={false}
          actionItems={this.actionItems()}
          filterable={true}
          filterItems={this.filterItems()}
          searchPlaceholder="Search Tasks..."
          onClick={this.goToTask}
          invertToolbarColors={false}
        />
      </div>
    );
  }
});

export default EventTaskList;

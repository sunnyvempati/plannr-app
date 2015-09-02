import TaskActions from '../../actions/TaskActions';
import TaskStore from '../../stores/TaskStore';
import classNames from 'classnames';
import {Link} from 'react-router';
import EventTaskQuickAdd from './EventTaskQuickAdd';

var EventTaskSmallTile = React.createClass({
  getInitialState: function () {
    return {
      tasks: null
    };
  },
  componentDidMount: function () {
    TaskStore.addChangeListener(this._onEventTasksRetrieved);
    this.getTaskState();
  },
  componentWillUnmount() {
    TaskStore.removeChangeListener(this._onEventTasksRetrieved);
  },
  _onEventTasksRetrieved() {
    this.getTaskState();
  },
  getTaskState: function() {
    var params = {with_event_id: this.props.eventId};
    let eventTasksCached = TaskStore.isCached(params);
    if (eventTasksCached) this.setState({tasks: TaskStore.getFromCache(params)});
    else TaskActions.getTasks(params);
  },
  getTaskContent: function() {
    var tasks = this.state.tasks;
    if (tasks) {
      var completedTasks = 0, toDoTasks = 0;
      tasks.forEach(function(task) {
        task.status == 'To do' ? toDoTasks++ : completedTasks++;
      });
      var percentComplete = tasks.length == 0 ? 0 : Number((completedTasks / tasks.length * 100).toFixed(1));
      return (
        <div className="TaskTile-content">
          <div className="TaskTile-percent">
            <div className="Task-display">
              {percentComplete + "%"}
            </div>
            <div className="TaskCompletionMeter">
              <span style={{width: percentComplete+"%"}}></span>
            </div>
          </div>
          <div className="TaskTile-count">
            <div className="Task-display">
              {completedTasks}
            </div>
            <div className="TileContent-title">
              Completed
            </div>
          </div>
          <div className="TaskTile-count">
            <div className="Task-display">
              {tasks.length}
            </div>
            <div className="TileContent-title">
              Total
            </div>
          </div>
        </div>
      )
    }
  },
  render: function () {
    var inputClasses = classNames({
      "Autocomplete-input": true,
      "is-invalid": this.state.errorState
    });
    return (
      <div className="Tile">
        <div className="Tile-header tasks">
          <Link to="event_tasks" params={{id: this.props.eventId}} className="Tile-headerLink">
            <div className="Tile-imgTask"></div>
            <div className="Tile-title">Tasks</div>
          </Link>
        </div>
        <div className="Task-content">
          <div className="TaskContent-quickAdd">
            <EventTaskQuickAdd eventId={this.props.eventId} />
          </div>
          {this.getTaskContent()}
        </div>
      </div>
    );
  }
});

export default EventTaskSmallTile;

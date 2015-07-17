var EditTaskModal = React.createClass({
  mixins: [Modal],
  getInitialState: function() {
    return {
      task: this.props.model,
      taskLoaded: false
    };
  },
  componentDidMount: function() {
    if (!!this.state.task.id) {
      var url = '/tasks/' + this.state.task.id + '.json';
      Utils.get(url, {}, function(result) {
        this.setState({task: result.task, taskLoaded: true});
      }.bind(this));
    }
  },
  onSuccess: function(result, createNew) {
    this.closeModal();
    this.props.onSuccess(result.task, createNew);
  },
  renderModalContent: function() {
    var verb = this.props.routeVerb;
    if (verb == 'POST' || (verb == 'PUT' && this.state.taskLoaded)) {
      return (
        <div className="EntityModal">
          {this.renderCloseModal()}
          <div className="EntityModal-header">
            <div className="EntityModal-headerIcon">
              <i className="fa fa-user"></i>
            </div>
            <div className="EntityModal-title">
              <h1>Edit Task</h1>
            </div>
          </div>
          <div className="EntityModal-content">
            <div className="Card">
              <div className="Card-content">
                <TaskForm
                  onSuccess={this.onSuccess}
                  authToken={this.props.authToken}
                  routeVerb={this.props.routeVerb}
                  compact={true}
                  onSecondaryClick={this.closeModal}
                  model={this.state.task} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

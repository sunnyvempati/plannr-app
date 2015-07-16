var EditTaskModal = React.createClass({
  mixins: [Modal],
  onSuccess: function(result, createNew) {
    this.closeModal();
    this.props.onSuccess(result.task);
    if (createNew) this.props.reopenCreateTaskModal();
  },
  renderModalContent: function() {
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
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

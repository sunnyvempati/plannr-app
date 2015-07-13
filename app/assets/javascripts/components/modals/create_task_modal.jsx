var CreateTaskModal = React.createClass({
  mixins: [Modal],
  closeAndRefreshData: function() {
    this.closeModal();
    this.props.refreshData();
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
            <h1>Create Task</h1>
          </div>
        </div>
        <div className="EntityModal-content">
          <div className="Card">
            <div className="Card-content">
              <TaskForm
                onSuccess={this.closeAndRefreshData}
                authToken={this.props.authToken}
                routeVerb='POST'
                model={this.props.model} />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var EditTaskModal = React.createClass({
  mixins: [Modal],
  closeAndRefreshData: function() {
    this.close();
    this.props.refreshData();
  },
  close: function() {
    this.closeModal();
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
                routeVerb='PUT'
                onSuccess={this.close}
                authToken={this.props.authToken}
                onSecondaryClick={this.closeAndRefreshData}
                model={this.props.model}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var TaskFormEdit = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.string
  },
  render: function () {
    var action = "/tasks/" + this.props.model.id,
      routeVerb = "PUT",
      primaryButtonText = "Update",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/tasks";

    return (
      <TaskForm
        action= {action}
        model={this.props.model}
        disableForm={false}
        showButtonList={true}
        routeVerb={routeVerb}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonVisible={true}
        secondaryButtonHref={secondaryButtonHref}
        authToken={this.props.authToken}
      />
    );
  }
});


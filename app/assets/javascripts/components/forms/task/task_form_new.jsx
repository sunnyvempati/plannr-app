var TaskFormNew = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      useReactRouter: false
    };
  },
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    currentUserId: React.PropTypes.string.isRequired,
    useReactRouter: React.PropTypes.bool,
    model: React.PropTypes.object
  },
  onSuccess: function() {
    // react router keeps things in context without redirecting
    if (this.props.useReactRouter) {
      this.context.router.transitionTo('tileTasks');
    }
    else {
      location.href = '/tasks';
    }
  },
  render: function () {
    var action = "/tasks",
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/tasks";

    return (
      <TaskForm action={action}
                model={this.props.model}
                disableForm={false}
                showButtonList={true}
                routeVerb={routeVerb}
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
                secondaryButtonVisible={true}
                secondaryButtonHref={secondaryButtonHref}
                authToken={this.props.authToken}
                currentUserId={this.props.currentUserId}
                onSuccess={this.onSuccess} />
    );
  }
});

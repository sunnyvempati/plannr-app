var TaskFormNew = React.createClass({
  mixins: [FormReactRouter],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    useReactRouter: React.PropTypes.bool,
    model: React.PropTypes.object,
    secondaryButtonHref: React.PropTypes.string
  },
  onSuccess: function() {
    // react router keeps things in context without redirecting
    if (this.props.useReactRouter) {
      this.context.router.transitionTo('tileTasksList');
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
      secondaryButtonHref = this.props.secondaryButtonHref || "/tasks";

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
                onSuccess={this.onSuccess} />
    );
  }
});

var EventFormEdit = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
  },
  render: function () {
    var action = "/events/" + this.props.model.id,
      routeVerb = "PUT",
      primaryButtonText = "Update",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/events";

    return (
      <EventForm
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


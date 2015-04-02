var EventFormEdit = React.createClass({

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
        notice={this.props.notice}
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


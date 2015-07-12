var EventFormNew = React.createClass({
  render: function () {
    var action = "/events" ,
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/events";

    return (
      <EventForm
        action= {action}
        model={this.props.model}
        authToken={this.props.authToken}>


      </EventForm>
    );
  }
});

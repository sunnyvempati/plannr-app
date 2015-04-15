var ContactFormNew = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
  },
  render: function () {
    var action = "/contacts" ,
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/contacts";

    return (
      <ContactForm
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

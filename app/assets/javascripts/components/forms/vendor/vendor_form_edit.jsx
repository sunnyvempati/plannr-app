var VendorFormEdit = React.createClass({
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.string
  },
  render: function () {
    var action = "/vendors/" + this.props.model.id,
      routeVerb = "PUT",
      primaryButtonText = "Update",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/vendors";

    return (
      <VendorForm
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


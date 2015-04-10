var VendorFormNew = React.createClass({

  render: function () {
    var action = "/vendors" ,
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/vendors";

    return (
      <VendorForm
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

var VendorFormNew = React.createClass({
  contextTypes: {
    router: React.PropTypes.func,
    secondaryButtonHref: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      useReactRouter: false
    };
  },
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
  },
  onSuccess: function(result) {
    // react router keeps things in context without redirecting
    if (this.props.useReactRouter) {
      this.context.router.transitionTo('tileVendorsList');
    }
    else {
      location.href = '/vendors/#/view/'+result.vendor.id;
    }
  },
  render: function () {
    var action = "/vendors" ,
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = this.props.secondaryButtonHref || "/vendors";

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
        onSuccess={this.onSuccess}
      />
    );
  }
});

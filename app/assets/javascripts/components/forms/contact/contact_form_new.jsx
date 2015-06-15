var ContactFormNew = React.createClass({
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
    useReactRouter: React.PropTypes.bool,
    model: React.PropTypes.object
  },
  onSuccess: function(result) {
    // react router keeps things in context without redirecting
    if (this.props.useReactRouter) {
      this.context.router.transitionTo('tileContactsList');
    }
    else {
      location.href = '/contacts/#/view/' + result.contact.id;
    }
  },
  render: function() {
    var action = "/contacts",
      routeVerb = "POST",
      primaryButtonText = "Create",
      secondaryButtonText = "Cancel",
      secondaryButtonHref = "/contacts";

    return (
      <ContactForm
        action={action}
        model={this.props.model}
        disableForm={false}
        showButtonList={true}
        routeVerb={routeVerb}
        primaryButtonText={primaryButtonText}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonVisible={true}
        secondaryButtonHref={secondaryButtonHref}
        authToken={this.props.authToken}
        onSuccess={this.onSuccess}/>
    );
  }
});

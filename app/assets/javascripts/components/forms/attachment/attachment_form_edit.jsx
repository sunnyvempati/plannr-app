var AttachmentFormEdit = React.createClass({
  mixins: [FormReactRouter],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    useReactRouter: React.PropTypes.bool,
    model: React.PropTypes.object
  },
  onSuccess: function () {
    // react router keeps things in context without redirecting
    if (this.props.useReactRouter) {
      this.context.router.transitionTo('tileAttachmentsList');
    }
    else {
      location.href = '/attachments';
    }
  },
  render: function () {
    var action = "/attachments/" + this.props.model.id,
        routeVerb = "PUT",
        primaryButtonText = "Update",
        secondaryButtonText = "Cancel",
        secondaryButtonHref = "/attachments";

    return (
        <AttachmentForm
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
            onSuccess={this.onSuccess}
            />
    );
  }
});


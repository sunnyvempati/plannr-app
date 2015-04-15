// Props
// url = URL to post/put to
// mapping = field mappings
// routeVerb = PUT/POST
// onSuccessUrl = Where to navigate on success
// authToken = CSRF token
// showButtonList = true/false
// primaryButtonText = text for primary button
// secondaryButtonVisible = Cancel button visibility
// secondaryButtonHref = Where to navigate on cancel
// secondaryButtonText = 'Cancel'

var Form = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    mapping: React.PropTypes.any,
    routeVerb: React.PropTypes.string,
    onSuccess: React.PropTypes.func.isRequired,
    authToken: React.PropTypes.string.isRequired,
    showButtonList: React.PropTypes.bool,
    primaryButtonText: React.PropTypes.string.isRequired,
    secondaryButtonVisible: React.PropTypes.bool,
    secondaryButtonHref: React.PropTypes.string,
    secondaryButtonText: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      mapping: {},
      routeVerb: 'post',
      showButtonList: true,
      secondaryButtonVisible: false,
      secondaryButtonText: 'Cancel'
    };
  },
  getInitialState: function() {
    return {canSubmit: false};
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  render: function() {
    var form_props = this.props;
    return (
      <Formsy.Form url={form_props.url}
                   onSuccess={form_props.onSuccess}
                   onSubmit={form_props.onSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}
                   mapping={form_props.mapping}
                   method={form_props.routeVerb}
                   id={form_props.id}>
        <FormInput type="hidden" name="authenticity_token" value={form_props.authToken}  />
        {form_props.children}
        <ButtonList showButtonList={form_props.showButtonList}
                    primaryButtonText={form_props.primaryButtonText}
                    primaryDisabled={!this.state.canSubmit}
                    secondaryButtonText={form_props.secondaryButtonText}
                    secondaryButtonHref={form_props.secondaryButtonHref}
                    secondaryButtonVisible={form_props.secondaryButtonVisible} />
      </Formsy.Form>
    );
  }
});

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
    url: React.PropTypes.string.isRequired,
    mapping: React.PropTypes.any,
    routeVerb: React.PropTypes.string,
    onSuccessUrl: React.PropTypes.string.isRequired,
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
  changeUrl: function() {
    location.href = this.props.onSuccessUrl;
  },
  render: function() {
    form_props = this.props;
    return (
      <div className="FormContainer">
        <Formsy.Form url={form_props.url}
                     onSuccess={this.changeUrl}
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}
                     mapping={this.props.mapping}
                     method={form_props.routeVerb}>
          <FormInput type="hidden" name="authenticity_token" value={form_props.authToken}  />
          {form_props.children}
          <ButtonList showButtonList={form_props.showButtonList}
                      primaryButtonText={form_props.primaryButtonText}
                      secondaryButtonText={form_props.secondaryButtonText}
                      secondaryButtonHref={form_props.secondaryButtonHref}
                      secondaryButtonVisible={form_props.secondaryButtonVisible} />

        </Formsy.Form>
      </div>
    );
  }
});

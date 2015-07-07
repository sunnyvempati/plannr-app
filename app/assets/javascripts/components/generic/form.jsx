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
    return {
      canSubmit: false,
      loading: false
    };
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
  onSubmit: function(data, resetForm, invalidateForm) {
    this.setState({loading: true});
  },
  removeLoading: function() {
    setTimeout(this.loadingComplete, 1000);
  },
  loadingComplete: function() {
    this.setState({loading: false});
  },
  renderLoadingIcon: function() {
    return <i className="fa fa-circle-o-notch fa-spin"></i>;
  },
  render: function() {
    var form_props = this.props;
    var buttonHtml = this.state.loading ? this.renderLoadingIcon() : this.props.primaryButtonText;
    return (
      <Formsy.Form url={form_props.url}
                   onSuccess={form_props.onSuccess}
                   onSubmit={this.onSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}
                   onSubmitted={this.removeLoading}
                   mapping={form_props.mapping}
                   method={form_props.routeVerb}
                   id={form_props.id}>
        <FormInput type="hidden" name="authenticity_token" value={form_props.authToken}  />
        {form_props.children}
        <ButtonList className='ButtonListContainer'>
          <ButtonSecondary isVisible={this.props.secondaryButtonVisible}
                           href={this.props.secondaryButtonHref}
                           buttonText={this.props.secondaryButtonText} />
          <ButtonPrimary type="submit" disabled={!this.state.canSubmit || this.state.loading}>
           {buttonHtml}
          </ButtonPrimary>
        </ButtonList>
      </Formsy.Form>
    );
  }
});

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
    mapping: React.PropTypes.any,
    authToken: React.PropTypes.string.isRequired
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
      canSubmit: false
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
  render: function() {
    var form_props = this.props;
    return (
      <Formsy.Form url={form_props.url}
                   onSubmit={this.props.onSubmit}
                   onValid={this.props.onValid}
                   onInvalid={this.props.onInvalid}
                   mapping={form_props.mapping}
                   id={form_props.id}>
        <FormInput type="hidden" name="authenticity_token" value={form_props.authToken}  />
        {form_props.children}
      </Formsy.Form>
    );
  }
});

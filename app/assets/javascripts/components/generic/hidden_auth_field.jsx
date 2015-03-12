var HiddenAuthFields = React.createClass({
  render: function() {
    var style = {display: 'none'};
    return (
      <div style={style}>
        <FormInput name="utf8" type="hidden" value="✓" />
        <FormInput type="hidden" name={this.props.auth_param} value={this.props.auth_token} />
      </div>
    );
  }
});

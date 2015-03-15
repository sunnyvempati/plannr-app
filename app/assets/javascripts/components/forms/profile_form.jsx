var ProfileForm = React.createClass({
  render: function() {
    return (
      <Form action={this.props.action} className="form" method="post" id="new_profile" submitBtnText="Save Profile">
        <HiddenAuthFields authParam={this.props.authParam} authToken={this.props.authToken} />
        <FormInput name="profile[first_name]" autofocus="autofocus" placeholder="First Name" type="text" />
        <FormInput name="profile[last_name]" autofocus="off" placeholder="Last Name" type="text" />
      </Form>
    );
  }
});

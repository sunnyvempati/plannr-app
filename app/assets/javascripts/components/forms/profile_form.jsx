var ProfileForm = React.createClass({
  render: function() {
    return (
      <div className="form-container">
        <Form action={this.props.action} className="form" method="post" id="new_profile">
          <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
          <FormInput name="profile[first_name]" className="form-control" autofocus="autofocus" placeholder="First Name" type="text" />
          <FormInput name="profile[last_name]" className="form-control" autofocus="off" placeholder="Last Name" type="text" />
          <Button type="submit" className="btn btn-default btn-full">
            Create Profile
          </Button>
        </Form>
      </div>
    );
  }
});

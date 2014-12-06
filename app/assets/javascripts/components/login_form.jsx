var LoginForm = React.createClass({
	render: function() {
		return (
			<div className="form-container">
				<Form action={this.props.action} class="form" method="post" id="new_user">
					<HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
					<FormInput name="user[email]" class="form-control" autofocus="autofocus" placeholder="sunny@yourplannr.com" type="email" />
					<FormInput name="user[password]" class="form-control" autofocus="off" placeholder="password" type="password" />
					<Button type="submit" button_class="btn btn-default btn-full">
						<div className="login-svg"></div>
					</Button>
				</Form>
			</div>
		);
	}
});

var LoginForm = React.createClass({
	render: function() {
		return (
			<div className="form-container">
				<Form action={this.props.action} method="post" id="new_user">
					<HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
					<FormInput name="user[email]" className="form-input" autofocus="autofocus" placeholder="sunny@yourplannr.com" type="email" />
					<FormInput name="user[password]" className="form-input" autofocus="off" placeholder="password" type="password" />
					<Button type="submit">
						Login
					</Button>
				</Form>
			</div>
		);
	}
});

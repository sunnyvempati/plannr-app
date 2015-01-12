var LoginForm = React.createClass({
	render: function() {
		return (
			<div className="login-form-container">
				<Form action={this.props.action} method="post" id="new_user" submitBtnText="login" submitBtnClass="login-form-btn">
					<HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
					<FormInput name="user[email]" autofocus="autofocus" placeholder="sunny@yourplannr.com" type="email" label="email" />
					<FormInput name="user[password]" autofocus="off" placeholder="password" type="password" label="password" />
				</Form>
			</div>
			
		);
	}

});

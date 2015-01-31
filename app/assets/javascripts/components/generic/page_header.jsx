var PageHeader = React.createClass({
	signOut: function() {
		location.href="/users/sign_out"
	},
	render: function() {
		return (
			<div className="page-header">
				<div className="page-header-title">
					{this.props.name}
				</div>
				<div className="page-header-app-bar">
					<i className="fa fa-sign-out sign-out" onClick={this.signOut}></i>
				</div>
			</div>
		);
	}
});
var Header = React.createClass({
	render: function() {
		var profile_id = this.props.profile_id;
		return (
			<div className="dashboard-header">
				<Logo />
				<HeaderMenu profile_id={this.props.profile_id} root_path={this.props.root_path} />
			</div>
		);
	}
});

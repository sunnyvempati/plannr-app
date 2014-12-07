var DashboardHeader = React.createClass({
	render: function() {
		var profile_id = this.props.profile.id;
		var name = this.props.profile.first_name + " " + this.props.profile.last_name;
		return (
			<div className="dashboard-header">
				<Logo />
				<HeaderMenu profile_id={profile_id} root_path={this.props.root_path} />
			</div>
		);
	}
});

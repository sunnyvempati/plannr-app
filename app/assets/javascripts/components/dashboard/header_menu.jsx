var HeaderMenu = React.createClass({
	render: function() {
		var profile_path = "/profiles/" + this.props.profile_id;
		return (
			<div className="header-menu-container">
				<div className="menu">
					<div className="btn-group">
					  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
					  	<div className="header-user-name">{this.props.user_name}</div>
					  	<span className="fui-user custom"></span>
					    <span className="caret"></span>
					  </button>
					  <ul className="dropdown-menu dropdown-menu-right" role="menu">
					  	<li><a href={this.props.root_path}>Dashboard</a></li>
					    <li><a href={profile_path} data-method="get">Profile</a></li>
					    <li className="divider"></li>
					    <li>
							  <a href="/users/sign_out" data-method="delete">Sign Out</a>
					    </li>
					  </ul>
					</div>
				</div>
			</div>
		);
	}
});

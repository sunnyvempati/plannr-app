var HeaderMenu = React.createClass({
	user_icon_display: function() {
		return (
  		<div>
  			<span className="fui-user icon-large"></span>
  			<span className="caret"></span>
  		</div>
  	)
	},
	render: function() {
		var profile_path = "/profiles/" + this.props.profile_id;
		return (
			<div className="header-menu">
				<FloatingDropDown display={this.user_icon_display()}>
					<li><a href={this.props.root_path}>Dashboard</a></li>
			    <li><a href={profile_path} data-method="get">Profile</a></li>
			    <li className="divider"></li>
			    <li>
					  <a href="/users/sign_out" data-method="delete">Sign Out</a>
			    </li>
				</FloatingDropDown>
			</div>
		);
	}
});

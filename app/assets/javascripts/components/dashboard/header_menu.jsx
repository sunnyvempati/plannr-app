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
			    <li>
					  <a href="/users/sign_out" data-method="delete">Sign Out</a>
			    </li>
			</div>
		);
	}
});

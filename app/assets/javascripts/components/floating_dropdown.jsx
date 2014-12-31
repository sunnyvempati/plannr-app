var FloatingDropDown = React.createClass({
	render: function() {
		return (
			<div className="btn-group">
			  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
			  	{this.props.display}
			  </button>
			  <ul className="dropdown-menu dropdown-menu-right" role="menu">
			  	{this.props.children}
			  </ul>
			</div>
		);
	}
});

var Menu = React.createClass({
	render: function() {
		return (
			<div className='menu-container'>
				<div className='menu-header'>
					{this.props.name}
				</div>
				<div className="menu-hr" />
			</div>
		);
	}
});

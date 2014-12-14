var MenuContent = React.createClass({
	render: function() {
		var path = this.props.path;
		var menu_items = this.props.menu_items.map(function(menu_item) {
			return (
				<MenuItem item={menu_item} path={path} />
			);
		});
		return (
			<div className="menu-item-container">{menu_items}</div>
		);
	}
});

var LeftNavList = React.createClass({
	render: function() {
		var path = this.props.active_path;
		var nav_items = this.props.nav_items.map(function(nav_item) {
			return (
				<LeftNavListItem item={nav_item} isSelected={nav_item.href == path} />
			);
		});
		return (
			<div className="left-nav list">
				{nav_items}
			</div>
		);
	}
});
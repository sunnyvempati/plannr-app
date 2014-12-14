var MenuItem = React.createClass({
	render: function() {
		var item = this.props.item;
		var active_class = item.href == this.props.path ? "active" : "";
		return (
			<a href={item.href}>
				<div className={"menu-item " + active_class}>
					<i className={item.icon_class + " icon-pad"} />
					{item.name}
				</div>
			</a>
		);
	}
});

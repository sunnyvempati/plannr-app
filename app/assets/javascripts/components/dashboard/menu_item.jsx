var MenuItem = React.createClass({
	handleClick: function(event) {
		console.log(event.target.child);
	},
	render: function() {
		var item = this.props.item;
		return (
			<div className="menu-item">
				<i className={item.class + " icon-pad"}></i>
				{this.props.item.name}
			</div>
		);
	}
});

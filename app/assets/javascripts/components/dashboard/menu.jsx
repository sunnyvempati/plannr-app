var Menu = React.createClass({
	render: function() {
		var menu_items = [
				{name: "Dashboard", class: "fa fa-tachometer"},
				{name: "Tasks", class: "fa fa-check"},
				{name: "Messages", class: "fa fa-comments"},
				{name: "Calendar", class: "fa fa-calendar-o"},
				{name: "Contacts", class: "fa fa-book"},
				{name: "Vendors", class: "fa fa-truck"},
				{name: "Past Events", class:"fa fa-archive"}];
		return (
			<div className='menu-container'>
				<div className='menu-header'>
					{this.props.name}
				</div>
				<MenuContent menu_items={menu_items} />
			</div>
		);
	}
});

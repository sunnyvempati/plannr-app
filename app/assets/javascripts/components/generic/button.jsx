var Button = React.createClass({
	render: function() {
		var button_class = this.props.className || "btn btn-default";
		return (
			<button {...this.props} className={button_class}>
				{this.props.children}
			</button>
		);
	}
});

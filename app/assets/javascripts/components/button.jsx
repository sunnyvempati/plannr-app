var Button = React.createClass({
	render: function() {
		var button_class = this.props.button_class || "btn btn-default";
		return (
			<button type={this.props.type} className={button_class}>
				{this.props.children}
			</button>
		);
	}
});

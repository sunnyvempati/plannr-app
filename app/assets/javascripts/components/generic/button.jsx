var Button = React.createClass({
	render: function() {
		var button_class = "btn btn-raised " + this.props.className;
		return (
			<button {...this.props} className={button_class}>
				{this.props.children}
			</button>
		);
	}
});

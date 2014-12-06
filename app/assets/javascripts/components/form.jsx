var Form = React.createClass({
	render: function() {
		return (
			<form acceptCharset="UTF-8" action={this.props.action} className={this.props.class} method={this.props.method} id={this.props.id}>
				{this.props.children}
			</form>
		);
	}
});

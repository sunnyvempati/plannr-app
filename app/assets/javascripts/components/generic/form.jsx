var Form = React.createClass({
	render: function() {
		var all_props = this.props;
		return (
			<div className="form">
				<div className="form-header"></div>
				<div className="form-content">
					<form acceptCharset="UTF-8" {...all_props}>
						{this.props.children}
					</form>
				</div>
			</div>
		);
	}
});

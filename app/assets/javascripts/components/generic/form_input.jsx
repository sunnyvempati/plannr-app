var FormInput = React.createClass({
	render: function() {
		return (
			<div className="field">
				<input {...this.props}></input>
			</div>
		);
	}
});

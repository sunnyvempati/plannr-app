var FormInput = React.createClass({
	render: function() {
		var autofocus = this.props.autofocus ? 'autofocus' : 'off';
		var placeholder = this.props.placeholder;
		var type = this.props.type;
		var value = this.props.value;
		return (
			<div className="field">
				<input autofocus={autofocus} name={this.props.name} className={this.props.class} placeholder={placeholder} type={type} value={value}></input>
			</div>
		);
	}
});

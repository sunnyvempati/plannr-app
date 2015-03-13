var ButtonSecondary = React.createClass({
    render: function () {
        var button_class = "Button Button--raised Button--secondary " + this.props.className;
        return (
        <a href={this.props.action}>
                <input type="button" type="button"  className={button_class} value={this.props.secondary_button_text}>
                </input>
        </a>
        );
    }
});

var ButtonSecondary = React.createClass({
    render: function () {
        var button_class = "Button Button--raised Button--secondary " + this.props.className;
        return (

                <button {...this.props} className={button_class}>
            {this.props.children}
                </button>

        );
    }
});

var Button = React.createClass({
  render: function() {
    var all_props = this.props;
    var button_class = "Button Button--raised Button--primary " + this.props.className;
    return (
        <button {...all_props} className={button_class}>
            {this.props.children}
        </button>
    );
  }
});

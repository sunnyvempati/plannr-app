var Button = React.createClass({
  render: function() {
    var button_class = "Button" + this.props.className;
    return (
      <button {...this.props} className={button_class}>
        {this.props.children}
      </button>
    );
  }
});

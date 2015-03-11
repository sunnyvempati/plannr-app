var Button = React.createClass({
  render: function() {
    var button_class = "Button Button--raised " + this.props.className;
    return (
      <div className="Button-overlay">
        <button {...this.props} className={button_class}>
            {this.props.children}
        </button>
      </div>
    );
  }
});

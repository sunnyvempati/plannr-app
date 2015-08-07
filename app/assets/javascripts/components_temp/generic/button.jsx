var Button = React.createClass({
  render: function() {
    var classes = {
      'Button': true,
      'Button--raised': true,
      'disabled': this.props.disabled
    };
    classes[this.props.className] = true;
    var btn_classes = classNames(classes);
    return (
      <button {...this.props} className={btn_classes}>
          {this.props.children}
      </button>
    );
  }
});

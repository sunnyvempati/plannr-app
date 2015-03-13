var Button = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    classes = {
      'Button': true,
      'Button--raised': true,
      'Button--primary': true
    };
    classes[this.props.className] = true;
    var btn_classes = cx(classes);
    return (
      <button {...this.props} className={btn_classes}>
          {this.props.children}
      </button>
    );
  }
});

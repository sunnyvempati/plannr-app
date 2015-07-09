var Button = React.createClass({
  getDefaultProps: function () {
    isInvisible: false
  },
  render: function() {
    var classes = {
      'Button': !this.props.isInvisible,
      'Button--raised': !this.props.isInvisible,
      'Button--primary': !this.props.isInvisible,
      'u-invisible': this.props.isInvisible
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

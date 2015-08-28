import ClassNames from 'classnames';

var Button = React.createClass({
  render: function() {
    var classes = {
      'Button': true,
      'Button--raised': true,
      'disabled': this.props.disabled
    };
    classes[this.props.className] = true;
    var btn_classes = ClassNames(classes);
    return (
      <button {...this.props} className={btn_classes}>
          {this.props.children}
      </button>
    );
  }
});

export default Button;

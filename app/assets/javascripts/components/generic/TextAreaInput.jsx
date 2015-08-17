import Formsy from 'formsy-react';

var TextAreaInput = React.createClass({
  mixins: [Formsy.Mixin],
  getDefaultProps: function() {
    return {
      className: 'FormInput'
    };
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function() {
    var className = this.props.className;
    var textAreaClasses = className + " " + className + "-textarea";
    return (
      <div className={textAreaClasses}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <textarea id={this.props.id}
                  name={this.props.name}
                  form={this.props.formId}
                  placeholder={this.props.placeholder}
                  onChange={this.changeValue}
                  value={this.getValue()}
                  rows="5" />
      </div>
    );
  }
});

export default TextAreaInput;

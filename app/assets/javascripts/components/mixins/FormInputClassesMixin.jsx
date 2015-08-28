var FormInputClassesMixin = {
  getDefaultProps: function() {
    return {
      className: 'FormInput'
    };
  },
  getClassNames: function() {
    var className = this.props.className;
    var inputContainerClasses = {
      'u-hidden': this.props.type == 'hidden'
    };
    inputContainerClasses[className] = true;
    var inputFieldClasses = {
      'is-invalid': !this.isValid() && !this.isPristine()
    };
    inputFieldClasses[className + '-field'] = true;
    return {
      inputContainer: inputContainerClasses,
      inputField: inputFieldClasses
    };
  }
}

export default FormInputClassesMixin;

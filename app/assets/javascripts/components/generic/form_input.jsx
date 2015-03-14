var FormInput = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      isValid: true,
      showValidation: false
    };
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  OnBlur: function() {
    this.setState({showValidation: true});
  },
  render: function() {
    show_validation = this.state.showValidation && !this.isValid();

    var item = this.props.item;
    var cx = React.addons.classSet;
    var input_classes = cx({
      'FormInput': true,
      'is-invalid': show_validation
    });
    error_message = show_validation ? this.getErrorMessage() : "";
    return (
      <div>
        <input className={input_classes}
               onChange={this.changeValue}
               value={this.getValue()}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type={this.props.type}
               onBlur={this.OnBlur}
               disabled={this.isFormDisabled()} />
        <span className="FormInput-errorMessage">{error_message}</span>
      </div>
    );
  }
});

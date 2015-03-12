var FormInput = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      isValid: true,
      setError: false
    };
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);

  },
  showValidation: function (event) {
    this.setState({
      setError: !this.isValid()
    });
  },
  render: function() {
    var item = this.props.item;
    var cx = React.addons.classSet;
    var input_classes = cx({
      'FormInput': true,
      'is-invalid': this.state.setError && !this.isValid()
    });
    var error_message = this.state.setError ? this.getErrorMessage() : "";
    return (
      <div>
        <input className={input_classes}
               onChange={this.changeValue}
               value={this.getValue()}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type={this.props.type}
               onBlur={this.showValidation}
               onFocus={this.resetValidation} />
        <span className="FormInput-errorMessage">{error_message}</span>
      </div>

    );
  }
});

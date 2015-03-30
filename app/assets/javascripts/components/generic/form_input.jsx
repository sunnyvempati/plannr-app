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
    if (this.props.dateField && !this.isValid()) {
      this.setState({
        _isValid: true,
        _serverError: null
      })
    }
  },
  onBlur: function() {
    this.setState({
      showValidation: true
    });
  },
  componentDidMount: function () {
    // for datepicker
    var id = "#" + this.props.id;
    if (this.props.dateField) {
      $(id).datepicker();
      $(id).change(function(e) {
        this.changeValue(e); // this accurately sets value
      }.bind(this));
    }
  },
  render: function() {
    var show_validation = this.state.showValidation && !this.isValid();
    if (this.props.dateField) {
      console.log("showValidation: "  + this.state.showValidation + " isValid: " + this.isValid());
    }
    var cx = React.addons.classSet;
    var input_classes = cx({
      'FormInput-field': true,
      'is-invalid': show_validation
    });
    var form_input_classes = cx({
      'FormInput': true,
      'is-hidden': this.props.type == 'hidden'
    });
    var error_message = show_validation ? this.getErrorMessage() : "";
    return (
      <div className={form_input_classes}>
        <label for={this.props.id}>{this.props.label}</label>
        <input name={this.props.name}
               className={input_classes}
               onChange={this.changeValue}
               value={this.getValue()}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type={this.props.type}
               onBlur={this.onBlur}
               disabled={this.props.disabled}
               id={this.props.id} />
        <span className="FormInput-fieldErrorMessage">{error_message}</span>
      </div>
    );
  }
});

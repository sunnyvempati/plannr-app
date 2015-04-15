var FormInput = React.createClass({
  mixins: [Formsy.Mixin],
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
  changeValue: function(event) {
    this.setValue(event.currentTarget.value);
  },
  render: function() {
    console.log(this.props.name + " " + this.isValid());
    var show_validation = this.state.showValidation && !this.isValid();
    var cx = React.addons.classSet;
    var input_classes = cx({
      'FormInput-field': true,
      'is-invalid': !this.isValid()
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
        <span className="FormInput-fieldErrorMessage">{this.getErrorMessage()}</span>
      </div>
    );
  }
});

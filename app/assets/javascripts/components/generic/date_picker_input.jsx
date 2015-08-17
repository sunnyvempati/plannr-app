var DatePickerInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin,
    FormInputClassesMixin
  ],
  changeValue: function(date) {
    this.setValue(date);
    if (this.props.onValueSet) {
      this.props.onValueSet(date);
    }
  },
  render: function() {
    var classes = this.getClassNames();
    return (
      <div className={classNames(classes.inputContainer)}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className={classNames(classes.inputField)}>
          <DatePicker selected={this.getValue()}
                      placeholderText={this.props.placeholder}
                      dateFormat="MM/DD/YYYY"
                      onChange={this.changeValue}
                      minDate={this.props.minDate}
                      weekStart='0'
          />
        </div>
        <span className="FormInput-fieldErrorMessage">{this.getErrorMessage()}</span>
      </div>
    );
  }
});

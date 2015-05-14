var DatePickerInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function(date) {
    this.setValue(date);
    if (this.props.onValueSet) {
      this.props.onValueSet(date);
    }
  },
  render: function() {
    var inputClasses = classNames({
      'FormInput-field': true,
      'is-invalid': !this.isValid()
    });
    return (
      <div className='FormInput'>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <DatePicker selected={this.getValue()}
                    placeholderText={this.props.placeholder}
                    dateFormat="MM/DD/YYYY"
                    onChange={this.changeValue}
                    minDate={this.props.minDate}
        />
        <span className="FormInput-fieldErrorMessage">{this.getErrorMessage()}</span>
      </div>
    );
  }
});

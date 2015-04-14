var FormSelectInput = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired // option tags
  },
  mixins: [Formsy.Mixin],
  getInitialState: function () {
    return {
      isValid: true,
      value: this.props.value
    };
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {
    var show_validation = this.state.showValidation && !this.isValid();
    var cx = React.addons.classSet;
    var input_classes = cx({
      'FormInput-field': true,
      'is-invalid': show_validation
    });
    var form_input_classes = cx({
      'FormInput': true,
      'is-hidden': this.props.type == 'hidden'
    });
    return (
      <div className={form_input_classes}>
        <label for={this.props.id}>{this.props.label}</label>
        <select value={this.getValue()}
                onChange={this.changeValue}
                className={input_classes}
                name={this.props.name}
                form={this.props.formId}
                disabled={this.props.disabled}>
          {this.props.options}
        </select>
      </div>
    );
  }
});

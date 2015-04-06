var SelectInput = React.createClass({
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
    var optionsHtml = convertOptionsToHtml(this.props.options);

    function convertOptionsToHtml(options) {
      var retOptionsHtml = [];
      $.each(options, function (index, value) {
        retOptionsHtml.push(<option key={index} value={value.value}>{value.text}</option>);
      });
      return retOptionsHtml;
    }

    return (
      <div className={form_input_classes}>
        <label for={this.props.id}>{this.props.label}</label>
        <select value={this.getValue()}
          onChange={this.changeValue}
          className={input_classes}
          name={this.props.name}
          form={this.props.formId}
        >
          {optionsHtml}
        </select>

      </div>

    );
  }
});

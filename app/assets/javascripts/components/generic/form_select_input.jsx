var FormSelectInput = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired, // option tags

    onChangeCallback: React.PropTypes.func,
    name: React.PropTypes.string,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    formId: React.PropTypes.string,
    id: React.PropTypes.string
  },
  mixins: [Formsy.Mixin],
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
    this.props.onChangeCallback(event.currentTarget.value);
  },
  render: function () {
    //TODO: clean up React JS console warnings
    var input_classes = classNames({
      'FormInput-field': true,
      'is-invalid': !this.isValid()
    });
    var form_input_classes = classNames({
      'FormInput': true,
      'is-hidden': this.props.type == 'hidden'
    });
    return (
      <div className={form_input_classes}>
        <label for={this.props.id}>{this.props.label}</label>
        <select id={this.props.id}
                value={this.getValue()}
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

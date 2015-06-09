var FormInput = React.createClass({
  mixins: [Formsy.Mixin],
  propTypes: {
    type: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    autofocus: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },
  changeValue: function(event) {
    this.setValue(event.currentTarget.value);
  },
  render: function() {
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
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input name={this.props.name}
               className={input_classes}
               onChange={this.changeValue}
               value={this.getValue()}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type={this.props.type}
               disabled={this.props.disabled}
               id={this.props.id} />
        <span className="FormInput-fieldErrorMessage">{this.getErrorMessage()}</span>
      </div>
    );
  }
});

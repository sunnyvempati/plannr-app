var FormInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin,
    FormInputClassesMixin
  ],
  propTypes: {
    type: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    autofocus: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string
  },
  changeValue: function(event) {
    this.setValue(event.currentTarget.value);
  },
  render: function() {
    var classes = this.getClassNames();
    return (
      <div className={classNames(classes.inputContainer)}>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input name={this.props.name}
               className={classNames(classes.inputField)}
               onChange={this.changeValue}
               value={this.getValue()}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type={this.props.type}
               disabled={this.props.disabled}
               id={this.props.id} />
        <span className={this.props.className + "-fieldErrorMessage"}>{!this.isPristine() && this.getErrorMessage()}</span>
      </div>
    );
  }
});

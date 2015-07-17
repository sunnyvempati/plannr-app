var CurrencyInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin,
    ReactIntl.IntlMixin
  ],
  changeValue: function(e) {
    var value = e.currentTarget.value;
    if (isNaN(value)) {
      return;
    }
    value = value.replace('$','');
    value = value.replace(',','');
    this.setValue(value);
  },
  getFormattedValue: function() {
    var value = this.getValue();
    return !!value ? this.formatNumber(value, {style: "currency", currency: "USD"}) : value;
  },
  render: function() {
    return (
      <div className="FormInput">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input name={this.props.name}
               className="FormInput-field"
               onChange={this.changeValue}
               value={this.getFormattedValue()}
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

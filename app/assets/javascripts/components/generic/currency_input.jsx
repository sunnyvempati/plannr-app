var CurrencyInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin
  ],
  changeValue: function(e) {
    var value = e.currentTarget.value;
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
      <div className="CurrencyInput">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <div className="CurrencyInput-field">
          <div className="CurrencyInput-icon">
            <i className="fa fa-usd"></i>
          </div>
          <input name={this.props.name}
                 className="FormInput-field"
                 onChange={this.changeValue}
                 value={this.getValue()}
                 autofocus={this.props.autofocus}
                 placeholder={this.props.placeholder}
                 type={this.props.type}
                 disabled={this.props.disabled}
                 id={this.props.id} />
        </div>
      </div>
    );
  }
});

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
    var optionsHtml = [];

    $.each(this.props.options, function(index, value) {
      optionsHtml.push( <option key={index} value={value.value}>{value.text}</option>);
    })

    return (
      <div className="FormInput-select">
        <label for={this.props.id}>{this.props.label}</label>
        <select value={this.getValue()}
          onChange={this.changeValue}
          className="SelectAreaInput"
          name={this.props.name}
          form={this.props.formId}
        >
          {optionsHtml}
        </select>

      </div>

    );
  }
});

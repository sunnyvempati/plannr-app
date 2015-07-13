var TextAreaInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function() {
    return (
      <div className="FormInput-textarea">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <textarea id={this.props.id}
                  name={this.props.name}
                  form={this.props.formId}
                  placeholder={this.props.placeholder}
                  className="TextAreaInput"
                  onChange={this.changeValue}
                  value={this.getValue()} />
      </div>

    );
  }
});

var TextAreaInput = React.createClass({
  render: function() {
    return (
      <div className="FormInput-textarea">
        <label for={this.props.id}>{this.props.label}</label>
        <textarea id={this.props.id}
                  name={this.props.name}
                  form={this.props.formId}
                  placeholder={this.props.placeholder}
                  className="TextAreaInput" />
      </div>

    );
  }
});
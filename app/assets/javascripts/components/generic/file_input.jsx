var FileInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue: function(event) {// All of this
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.onload = function(upload, file_name, file_extension) {
      this.setFileContents(upload.target.result);
    }.bind(this)

    reader.readAsDataURL(file);
  },
  setFileContents: function(fileContents) {
    this.setValue({file_contents: fileContents, file_name: this.state.file_name});
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
        <label htmlFor='file_picker'>{this.props.label}</label>
        <input name='file_picker'
               className={input_classes}
               onChange={this.changeValue}
               autofocus={this.props.autofocus}
               placeholder={this.props.placeholder}
               type='file'
               onBlur={this.onBlur}
               disabled={this.props.disabled}
               id='file_picker' />

        <span className="FormInput-fieldErrorMessage">{this.getErrorMessage()}</span>
      </div>
    );
  }
});

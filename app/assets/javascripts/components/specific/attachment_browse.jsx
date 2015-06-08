var AttachmentBrowse = React.createClass({
  propTypes: {
    clickableElement: React.PropTypes.element.isRequired,
    onAssociation: React.PropTypes.func
  },
  getInitialState: function () {
    return {loading: false};
  },
  changeValue: function () {
    var reader = new FileReader();
    var file = event.target.files[0];
    reader.onload = function (upload) {
      var params = this.getParams(upload.target.result, file.name);
      this.postToServer(params);
    }.bind(this);
    this.setState({loading: true});
    reader.readAsDataURL(file);
  },
  postToServer: function (params) {
    $.post("attachments.json", params, function (result) {
      //TODO: use data in result to update our table
      //I currently refresh all the data in the table
      this.props.onAssociation(result.attachment);
      this.reset();
    }.bind(this));
  },
  reset: function () {
    //TODO: do without jQuery; find a replacement for replaceWith without jQuery
    //clear file name from browse - file inputs don't like being touched
    // so I replace the control with a clone
    var control = $(this.refs.filePicker.getDOMNode());
    control.replaceWith(control.clone(true));
    this.setState({loading: false, fileName: ''});
  },
  getParams: function (fileContents, fileName) {
    return {
      'attachment': {
        'file_name': fileName,
        'file_link': fileContents
      }
    }
  },
  clickFilePicker: function () {
    this.refs.filePicker.getDOMNode().click();
  },
  render: function () {
    var spinnerClasses = classNames({
      'fa fa-spinner fa-pulse fa-2x': this.state.loading,
      'u-hidden': !this.state.loading
    });
    var inputClasses = classNames({
      'u-hidden': this.state.loading,
      'ClickableFileUploadButton': true
    });
    return (
        <div>
          <i className={spinnerClasses}></i>

          <div className={inputClasses} onClick={this.clickFilePicker}>
            {this.props.clickableElement}
            <input name='file_picker'
                   onChange={this.changeValue}
                   type='file'
                   id='file_picker'
                   ref='filePicker'
                   className='upload'/>
          </div>
        </div>
    );
  }
});

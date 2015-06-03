var AttachmentBrowse = React.createClass({
  getInitialState: function () {
    return {loading: false, fileName: ''};
  },
  changeValue: function () {
    var reader = new FileReader();
    var file = event.target.files[0];
    reader.onload = function (upload) {
      var params = this.getParams(upload.target.result, this.state.fileName);
      this.postToServer(params);
    }.bind(this);
    this.setState({loading: true, fileName: file.name});
    reader.readAsDataURL(file);
  },
  postToServer: function (params) {
    $.post("attachments.json", params, function (result) {
      //use data in result to update our table (@attachment.save)
      this.props.onAssociation(result.attachment);
      //clear file name from browse - file inputs are picky
      var control = $("#file_picker");
      control.replaceWith(control.clone(true));
      this.setState({loading: false, fileName: ''});
    }.bind(this));
  },
  getParams: function (fileContents, fileName) {
    return {
      'attachment': {
        'file_name': fileName,
        'file_link': fileContents
      }
    }
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
    var buttonClasses = classNames({
      'Button Button--raised Button--primary': true
    });
    return (
        <div className="AttachmentBrowseContainer">
          <i className={spinnerClasses}></i>
          <div className={inputClasses}>
            <button className={buttonClasses}>Browse</button>
            <input name='file_picker'
                   onChange={this.changeValue}
                   type='file'
                   id='file_picker'
                   className='upload'/>
          </div>
        </div>
    );
  }
});

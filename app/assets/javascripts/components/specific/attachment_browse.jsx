var AttachmentBrowse = React.createClass({
  propTypes: {
    clickableElement: React.PropTypes.element.isRequired,
    onAssociation: React.PropTypes.func
  },
  getInitialState: function () {
    return {loading: false};
  },
  componentDidMount: function() {
    $(this.refs.fileAttachment.getDOMNode()).fileupload({
      url: 'attachments.json',
      singleFileUploads: true,
      paramName: "file_attachment",
      done: function(e, data) {
        console.log(e);
        console.log(data);
      }
    });
  },
  changeValue: function () {
    console.log("changed value");
    //TODO: don't upload; add to queue
    // var reader = new FileReader();
    // var file = event.target.files[0];
    // console.log('filesize:' + file.size);
    // reader.onload = function (upload) {
    //   var params = this.getParams(upload.target.result, file.name);
    //   var doneCallback = function(data, textStatus, jqXHR) {
    //     //TODO: use data in result to update our table
    //     //I currently refresh all the data in the table
    //     this.props.onAssociation(data.attachment);
    //     ToastMessages.toast('File uploaded - ' + data);
    //   }.bind(this);
    //   var failCallback = function(jqXHR, textStatus, errorThrown) {
    //     ToastMessages.toastError('Error: upload failed: ' + errorThrown);
    //   }.bind(this);
    //   var alwaysCallback = function() {
    //     this.reset();
    //   }.bind(this);
    //   HttpHelpers.postToServer('attachments.json', params, doneCallback, failCallback, alwaysCallback);
    // }.bind(this);
    // reader.onerror = function(a, b, c, d, e) {
    //   console.log('onerror');
    //   console.log(a);
    //   console.log(b);
    //   console.log(c);
    //   console.log(d);
    //   console.log(e);

    // };
    // this.setState({loading: true});
    // //debugger;
    // reader.readAsDataURL(file);
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
    this.refs.fileAttachment.getDOMNode().click();
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
            <input name='file_attachment'
                   type='file'
                   id='fileAttachment'
                   ref='fileAttachment'
                   className='upload' />
          </div>
        </div>
    );
  }
});

var AttachmentActionButtonUpload = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
    onAssociation: React.PropTypes.func
  },
  getInitialState: function () {
    return {loading: false, fileName: ''};
  },
  componentDidMount: function () {
    this.causeChildElementToActLikeInputTypeFile();
  },
  causeChildElementToActLikeInputTypeFile: function () {
    //$childElement is the element that I want to click on
    //$filePickerElement is the input type=file
    //when you click on the $childElement, act like you clicked on the $filePickerElement
    var $childElement = $(this.refs.onlyChild.getDOMNode())[0];
    $childElement.addEventListener("click", function () {
      var $filePickerElement = $(this.refs.filePicker.getDOMNode())[0];
      $filePickerElement.click();
    }.bind(this), false);
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
      //TODO: use data in result to update our table (add record to table, do I need ID of new record? It
      // should be in there)
      this.props.onAssociation(result.attachment);
      this.reset();
    }.bind(this));
  },
  reset: function () {
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
        <div className="AttachmentBrowseContainer">
          <i className={spinnerClasses}></i>

          <div className={inputClasses}>
            {
              //clone child element to assign ref dynamically
              React.cloneElement(this.props.children, {ref: 'onlyChild'})
            }
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

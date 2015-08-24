import classNames from 'classnames'
import AttachmentActions from '../../actions/AttachmentActions';

var AttachmentBrowse = React.createClass({
  propTypes: {
    clickableElement: React.PropTypes.element.isRequired,
    onAssociation: React.PropTypes.func
  },
  getInitialState: function () {
    return {loading: false};
  },
  componentDidMount: function() {
    this.configureFileAttachmentField();
  },
  configureFileAttachmentField: function() {
    // var _this = this;
    // $(this.refs.fileAttachment.getDOMNode()).fileupload({
    //   url: 'attachments.json',
    //   singleFileUploads: true,
    //   paramName: "file_attachment",
    //   add: function(e, data) {
    //     if (data.files[0].size <= 52428800) {
    //       _this.setState({loading: true});
    //       data.submit();
    //     }
    //     else
    //     {
    //       ToastMessages.toastError("File upload limit: 50MB");
    //     }
    //   },
    //   done: function(e, data) {
    //     _this.props.onAssociation(data.result);
    //   },
    //   fail: function(e, data) {
    //     ToastMessages.toastError('Error: upload failed');
    //   },
    //   always: function(e, data) {
    //     _this.setState({loading: false}, _this.configureFileAttachmentField);
    //   }
    // });
  },
  clickFileAttachment: function() {
    this.refs.fileAttachment.getDOMNode().click();
  },
  attachmentChange(e) {
    AttachmentActions.create(e.target.value);
    console.log(e.target.value);
  },
  renderInput: function() {
    if (!this.state.loading) {
      return ( <input name='file_attachment'
                      type='file'
                      id='fileAttachment'
                      ref='fileAttachment'
                      onChange={this.attachmentChange}
                      className='upload'/>);
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
        <div>
          <i className={spinnerClasses}></i>

          <div className={inputClasses} onClick={this.clickFileAttachment}>
            {this.props.clickableElement}
            {this.renderInput()}
          </div>
        </div>
    );
  }
});

export default AttachmentBrowse;

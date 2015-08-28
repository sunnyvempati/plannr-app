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
  clickFileAttachment: function() {
    this.refs.fileAttachment.getDOMNode().click();
  },
  attachmentChange(e) {
    let formData = new FormData();
    let files = React.findDOMNode(this.refs.fileAttachment).files;
    for (let key in files) {
      if (files.hasOwnProperty(key) && files[key] instanceof File) {
        formData.append('file_attachment', files[key]);
        AttachmentActions.create(formData, this.props.eventId);
      }
    }
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

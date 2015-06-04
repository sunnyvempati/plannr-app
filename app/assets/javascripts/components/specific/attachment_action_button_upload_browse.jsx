var AttachmentActionButtonUploadBrowse = React.createClass({
  render: function () {
    return (
        <AttachmentActionButtonUpload {...this.props}>
          <button className='Button Button--raised Button--primary'>Browse</button>
        </AttachmentActionButtonUpload>
    );
  }
});

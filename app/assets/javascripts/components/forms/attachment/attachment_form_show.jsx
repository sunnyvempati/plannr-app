var AttachmentFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function () {
    var action = "/attachments";

    return (
        <AttachmentForm
            action={action}
            model={this.props.model}
            disableForm={true}
            showButtonList={false}
            />
    );
  }
});


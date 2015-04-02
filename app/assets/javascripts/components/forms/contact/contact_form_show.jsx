var ContactFormShow = React.createClass({
  render: function () {
    var action = "/contacts";

    return (
      <ContactForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        notice={this.props.notice}
      />
    );
  }
});


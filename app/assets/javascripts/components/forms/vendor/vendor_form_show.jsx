var VendorFormShow = React.createClass({
  render: function () {
    var action = "/vendors";

    return (
      <VendorForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        notice={this.props.notice}
      />
    );
  }
});


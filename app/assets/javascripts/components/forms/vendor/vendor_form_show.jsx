var VendorFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.string
  },
  render: function () {
    var action = "/vendors";

    return (
      <VendorForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
      />
    );
  }
});


var VendorFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function() {
    var action = "/vendors";

    return (
      <VendorForm
        action={action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}/>
    );
  }
});


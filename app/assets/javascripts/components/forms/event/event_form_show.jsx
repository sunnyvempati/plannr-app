var EventFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function () {
    var action = "/events";

    return (
      <EventForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
      />
    );
  }
});


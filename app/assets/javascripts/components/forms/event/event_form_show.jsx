var EventFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.string
  },
  render: function () {
    var action = "/events";

    return (
      <EventForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        notice={this.props.notice}
      />
    );
  }
});


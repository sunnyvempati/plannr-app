var TaskFormShow = React.createClass({
  propTypes: {
    userId: React.PropTypes.string.isRequired,

    model: React.PropTypes.object
  },
  render: function () {
    var action = "/tasks";

    return (
      <TaskForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        userId={this.props.userId}
      />
    );
  }
});


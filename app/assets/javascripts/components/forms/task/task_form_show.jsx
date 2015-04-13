var TaskFormShow = React.createClass({
  render: function () {
    var action = "/tasks";

    return (
      <TaskForm
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        notice={this.props.notice}
      />
    );
  }
});


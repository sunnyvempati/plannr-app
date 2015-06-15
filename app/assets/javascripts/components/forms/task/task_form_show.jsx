var TaskFormShow = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },
  render: function() {
    var action = "/tasks";

    return (
      <TaskForm
        action={action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}/>
    );
  }
});


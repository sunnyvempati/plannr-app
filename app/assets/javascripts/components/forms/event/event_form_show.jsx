var EventFormShow = React.createClass({
  render: function () {
    var action = "/events";

    return (
      <EventFormBig
        action= {action}
        model={this.props.model}
        disableForm={true}
        showButtonList={false}
        notice={this.props.notice}
      />
    );
  }
});


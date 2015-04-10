var EventFormShowBig = React.createClass({
  render: function () {
    var action = "/events";
    return (
      <div>
  
        <EventForm
          action= {action}
          model={this.props.model}
          disableForm={true}
          showButtonList={false}
          notice={this.props.notice}
        />
      </div>
      );
  }
});


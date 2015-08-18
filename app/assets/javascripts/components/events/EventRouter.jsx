var EventRouter = React.createClass({
  render: function() {
    return (
      <div className="EventRouter">{this.props.params.id}</div>
    );
  }
});

export default EventRouter;

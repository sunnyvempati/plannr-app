var EventFormShowBig = React.createClass({
  render: function () {
    var event = this.props.model;
    return (
      <EventContactAutocomplete eventId={event.id} />
    );
  }
});

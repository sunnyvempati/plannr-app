import Comments from '../comments/Comments';

var EventComments = React.createClass({
  render: function() {
    return (
      <Comments entity="Event"
                entity_id={this.props.params.id} />
    );
  }
});

export default EventComments;

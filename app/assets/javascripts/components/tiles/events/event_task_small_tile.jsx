var EventTaskSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("tasks", function(results) {
      console.log(results);
      if (this.isMounted()) {
        this.setState({
          count: results.tasks.length
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="EventTaskSmallTile">
        <Link to="tileTasks">Zoom In Tasks</Link>
        <ObjectCount count={this.state.count} text='Tasks' />
      </div>
    );
  }
});

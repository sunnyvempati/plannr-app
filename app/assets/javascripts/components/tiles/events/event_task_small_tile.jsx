var EventTaskSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("tasks/count", function(results) {
      if (this.isMounted()) {
        this.setState({
          count: results
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="EventTaskSmallTile">
        <Link to="tileTasks">Zoom Tasks</Link>
          <ObjectCount count={this.state.count} text='Tasks' />

      </div>
    );
  }
});

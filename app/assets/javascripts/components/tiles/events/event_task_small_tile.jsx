var EventTaskSmallTile = React.createClass({
  getInitialState: function() {
    return {
      count: null
    };
  },
  componentDidMount: function() {
    $.get("tasks", function(results) {
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
        <Link to="tileTasksList">Zoom In - Tasks</Link>
        <div className="Tile">
          <div className="Tile-header">
          <Link to="tileTasks">Tasks</Link>
        </div>
        <div className="Tile-content">
          {this.state.count + " Tasks"}
        </div>
      </div>
    );
  }
});

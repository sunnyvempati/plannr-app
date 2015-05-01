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
      <div className="Tile">
        <div className="Tile-header">
          <Link to="tileTasksList" className="Tile-headerLink">
            <div className="Tile-imgTask"></div>
            <div className="Tile-title">Tasks</div>
          </Link>
        </div>
        <div className="Tile-content">
          <div className="TileContent-count">
            {this.state.count}
          </div>
          <div className="TileContent-title">
            Total
          </div>
        </div>
      </div>
    );
  }
});

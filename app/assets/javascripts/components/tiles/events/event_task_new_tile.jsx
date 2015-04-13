var EventTaskNewTile = React.createClass({
  getInitialState: function() {
    return {
      model: null
    };
  },
  componentDidMount: function() {
    $.get("tasks/new_json", function(results) {
      if (this.isMounted()) {
        this.setState({
          model: results
        })
      }
    }.bind(this))
  },
  render: function() {
    return (
      <div className="EventTaskNewTile">
        <Link to="tileAll">Go back to home</Link>
        <TaskFormNew model={this.state.model} authToken={this.props.authToken}/>
      </div>
    );
  }
});

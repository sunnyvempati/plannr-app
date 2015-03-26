

var App = React.createClass({
  render: function () {
    return (
      <div>
        <div>App stuff</div>
        <ul>
          <li><Link to="event">Event</Link></li>
        </ul>
          <RouteHandler />
      </div>
    );
  }
});

var Event = React.createClass({
  render: function () {
    return (
      <div>
        <div>Event stuff</div>
        <ul>
          <li><Link to="task">Task</Link></li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
});

var Task = React.createClass({
  render: function () {
    return (
      <div>
        <div>Task stuff</div>
      </div>
    );
  }
});


var doStuff = function () {
  var routes = (
    <Route   handler={App}>
      <Route name="event" path="event" handler={Event} >
      <Route name="task" path="event/task" handler={Task} />
        </Route>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('example2'));
  });

}


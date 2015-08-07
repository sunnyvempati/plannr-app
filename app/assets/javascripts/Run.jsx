const router = require('./stores/RouteStore.jsx').getRouter();

const Run = React.createClass({
  componentDidMount() {
    router.run((Handler, state) => {
      React.render(<Handler />, React.findDOMNode(this.refs.content))
    });
  },
  render() {
    return (
      <div ref="content"></div>
    );
  }
});

export default Run;

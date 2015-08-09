const React = require('react');
const router = require('./stores/RouteStore.jsx').getRouter();
const GlobalStore = require('./stores/GlobalStore.jsx');

const Run = React.createClass({
  componentDidMount() {
    GlobalStore.AuthToken = this.props.authToken;
    GlobalStore.WebPath = this.props.webPath;
    router.run((Handler, state) => {
      React.render(
        <Handler />,
        React.findDOMNode(this.refs.content))
    });
  },
  render() {
    return (
      <div ref="content"></div>
    );
  }
});

export default Run;

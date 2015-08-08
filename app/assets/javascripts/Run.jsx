const React = require('react');
const router = require('./stores/RouteStore.jsx').getRouter();

const Run = React.createClass({
  componentDidMount() {
    router.run((Handler, state) => {
      React.render(
        <Handler webPath={this.props.webPath} />,
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

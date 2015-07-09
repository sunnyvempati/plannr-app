var ButtonPrimary = React.createClass({
  propTypes: {
  },
  getDefaultProps: function() {
    return {
    }
  },
  render: function() {
    var classes = classNames({
      'Button': true,
      'Button--raised': true,
      'Button--primary': true
    });
    return (
      <button {...this.props}
          className={classes}>
        {this.props.children}
      </button>
    );
  }
});

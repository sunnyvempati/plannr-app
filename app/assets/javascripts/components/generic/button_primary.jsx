var ButtonPrimary = React.createClass({
  propTypes: {
  },
  getDefaultProps: function() {
    return {
    }
  },
  handleOnClick: function() {
    window.location.href = this.props.href;
  },
  render: function() {
    var classes = classNames({
      'Button': true,
      'Button--raised': true,
      'Button--primary': true
    });
    return (
      <button
          type='submit'
          className={classes}>
        {this.props.children}
      </button>
    );
  }
});

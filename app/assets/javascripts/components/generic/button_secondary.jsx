var ButtonSecondary = React.createClass({
  propTypes: {
    isVisible: React.PropTypes.bool,
    href: React.PropTypes.string,
    buttonText: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },
  handleOnClick: function() {
    window.location.href = this.props.href;
  },
  render: function() {
    var classes = classNames({
      'Button': true,
      'Button--raised': true,
      'Button--secondary': true,
      'is-visible': this.props.isVisible
    });
    return (
      <button type='button' onClick={this.handleOnClick} className={classes} disabled={this.props.disabled}>
        {this.props.buttonText}
      </button>
    );
  }
});

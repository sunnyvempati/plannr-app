var ButtonSecondary = React.createClass({
  propTypes: {
    isVisible: React.PropTypes.bool,
    href: React.PropTypes.string,
    buttonText: React.PropTypes.string
  },
  handleOnClick: function() {
    window.location.href = this.props.href;
  },
  render: function() {
    var ButtonSecondaryClasses = classNames({
      'Button': true,
      'Button--raised': true,
      'Button--secondary': true,
      'is-visible': this.props.isVisible
    });
    return (
      <button type='button' onClick={this.handleOnClick} className={ButtonSecondaryClasses}>
        {this.props.buttonText}
      </button>
    );
  }
});

var ButtonSecondary = React.createClass({
  propTypes: {
    isVisible: React.PropTypes.bool,
    href: React.PropTypes.string,
    buttonText: React.PropTypes.string
  },
  render: function() {
    var cx = React.addons.classSet;
    var ButtonSecondaryClasses = cx({
      'Button': true,
      'Button--raised': true,
      'Button--secondary': true,
      'is-visible': this.props.isVisible
    });
    return (
      <a href={this.props.href}>
        <input type="button"
               className={ButtonSecondaryClasses}
               value={this.props.buttonText}>
        </input>
      </a>
    );
  }
});

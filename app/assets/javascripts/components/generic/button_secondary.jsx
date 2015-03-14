var ButtonSecondary = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var btn_classes = cx({
      'Button': true,
      'Button--raised': true,
      'Button--secondary': true,
      'is-visible': this.props.isVisible
    });
    return (
      <a href={this.props.secondaryHref}>
        <input type="button" className={btn_classes} value={this.props.children}>
        </input>
      </a>
    );
  }
});

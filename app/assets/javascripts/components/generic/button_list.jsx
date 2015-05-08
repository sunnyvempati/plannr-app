//contains two buttons which may be toggled on or off
//  showButtonList: true/false
//  primaryButtonText: "Submit"
//  secondaryButtonText: "Cancel"
//  secondaryButtonHref: '/events'
//  secondaryButtonVisible: true/false

var ButtonList = React.createClass({
  propTypes: {
    showButtonList: React.PropTypes.bool.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    primaryDisabled: React.PropTypes.bool,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    secondaryButtonHref: React.PropTypes.string.isRequired,
    secondaryButtonText: React.PropTypes.string.isRequired
  },
  render: function() {
    var cx = React.addons.classSet;
    var containerClasses = cx({
      'ButtonListContainer': true,
      'u-hidden': !this.props.showButtonList
    });
    return (
      <div className={containerClasses}>
        <ButtonSecondary isVisible={this.props.secondaryButtonVisible}
                         href={this.props.secondaryButtonHref}
                         buttonText={this.props.secondaryButtonText} />
        <Button type="submit" disabled={this.props.primaryDisabled}>
          {this.props.primaryButtonText}
        </Button>
      </div>
    );
  }
});

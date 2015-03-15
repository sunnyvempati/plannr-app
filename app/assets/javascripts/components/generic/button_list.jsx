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
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    secondaryButtonHref: React.PropTypes.string.isRequired,
    secondaryButtonText: React.PropTypes.string.isRequired
  },
  render: function() {
    var cx = React.addons.classSet;
    var containerClasses = cx({
      'ButtonListContainer': true,
      'is-visible': this.props.showButtonList
    });
    return (
      <div className={containerClasses}>
        <ButtonSecondary  isVisible={this.props.secondaryButtonVisible}
                          className="FormCancelButton"
                          href={this.props.secondaryButtonHref}
                          buttonText={this.props.secondaryButtonText} />
        <Button type="submit">
          {this.props.primaryButtonText}
        </Button>
      </div>
    );
  }
});

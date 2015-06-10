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
    secondaryButtonText: React.PropTypes.string.isRequired,
    primaryLoading: React.PropTypes.bool
  },
  loadingIcon: function() {
    return <i className="fa fa-circle-o-notch fa-spin"></i>;
  },
  render: function() {
    var containerClasses = classNames({
      'ButtonListContainer': true,
      'u-hidden': !this.props.showButtonList
    });
    var buttonChild = this.props.primaryLoading ? this.loadingIcon() : this.props.primaryButtonText;
    return (
      <div className={containerClasses}>
        <ButtonSecondary isVisible={this.props.secondaryButtonVisible}
                         href={this.props.secondaryButtonHref}
                         buttonText={this.props.secondaryButtonText} />
        <Button type="submit" disabled={this.props.primaryDisabled || this.props.primaryLoading}>
          {buttonChild}
        </Button>
      </div>
    );
  }
});

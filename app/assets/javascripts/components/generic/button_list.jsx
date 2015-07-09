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
    primaryLoading: React.PropTypes.bool,
    tertiaryButtonText: React.PropTypes.string
  },
  getDefaultProps: function(){
    return {
      tertiaryButtonText: null
    }
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
    var buttonChild2 = this.props.primaryLoading ? this.loadingIcon() : this.props.tertiaryButtonText;
    return (
      <div className={containerClasses}>
        <ButtonSecondary isVisible={this.props.secondaryButtonVisible}
                         href={this.props.secondaryButtonHref}
                         buttonText={this.props.secondaryButtonText} />
        <Button type="submit" disabled={this.props.primaryDisabled || this.props.primaryLoading} onClick={this.handleClick}>
          {buttonChild}
        </Button>
        <Button type="submit" disabled={this.props.primaryDisabled || this.props.primaryLoading} isInvisible={this.props.tertiaryButtonText === null} onClick={this.props.onTertiaryButtonClick}>
          {buttonChild2}
        </Button>
      </div>
    );
  }
});

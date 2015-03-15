//contains two buttons which may be toggled on or off
//    primaryButtonText: "Submit"
//    secondaryButtonText: "Cancel"
//    hide_primary_button: "true"
//    secondaryButtonVisible: "true"

var ButtonList = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var btn_container_classes = cx({
      'ButtonListContainer': true,
      'is-visible': this.props.showButtonList
    });
    return (
      <div className={btn_container_classes}>
        <ButtonSecondary isVisible={this.props.secondaryButtonVisible} className="FormCancelButton" href={this.props.secondaryButtonHref}>
            {this.props.secondaryButtonText}
        </ButtonSecondary>
        <Button type="submit" className="FormSubmitButton">
          {this.props.primaryButtonText}
        </Button>
      </div>
    );
  }
});

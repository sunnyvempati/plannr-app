//contains two buttons which may be toggled on or off
//    primary_button_text: "Submit"
//    secondary_button_text: "Cancel"
//    hide_primary_button: "true"
//    hide_secondary_button: "true"

var ButtonList = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var btn_container_classes = cx({
      'ButtonListContainer': true,
      'is-visible': this.props.showButtonList
    });
    return (
      <div className={btn_container_classes}>
        <ButtonSecondary isVisible={this.props.secondaryVisible} className="FormCancelButton" secondaryHref={this.props.secondaryBtnHref}>
            {this.props.secondaryBtnText}
        </ButtonSecondary>
        <Button type="submit" className="FormSubmitButton">
          {this.props.primaryBtnText}
        </Button>
      </div>
    );
  }
});

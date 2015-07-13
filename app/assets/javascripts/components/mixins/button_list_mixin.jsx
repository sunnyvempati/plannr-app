var ButtonListMixin = {
  handleSecondaryClick: function(e) {
    e.preventDefault();
    this.onSecondaryClick();
  },
  renderFormTwoButtons: function() {
    var primaryButtonText = this.props.routeVerb == "POST" ? "Create" : "Update";
    return (
      <FormButtonList>
        <Button onClick={this.handleSecondaryClick} className="Button--secondary" disabled={this.state.loading}>
          Cancel
        </Button>
        <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
          {primaryButtonText}
        </Button>
      </FormButtonList>
    );
  }
}

var ButtonListMixin = {
  handleSecondaryClick: function(e) {
    e.preventDefault();
    this.onSecondaryClick();
  },
  renderFormTwoButtons: function(primaryText, secondaryText) {
    return (
      <FormButtonList>
        <Button type="button" onClick={this.handleSecondaryClick} className="Button--secondary">
          {secondaryText}
        </Button>
        <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
          {primaryText}
        </Button>
      </FormButtonList>
    );
  },
  renderFormButton: function(primaryText) {
    return (
      <FormButtonList>
        <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
          {primaryText}
        </Button>
      </FormButtonList>
    );
  }
}

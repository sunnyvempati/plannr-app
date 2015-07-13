var ButtonListMixin = {
  renderFormTwoButtons: function(primaryText, secondaryText) {
    return (
      <FormButtonList>
        <Button onClick={this.onSecondaryClick} className="Button--secondary" disabled={this.state.loading}>
          {secondaryText}
        </Button>
        <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
          {primaryText}
        </Button>
      </FormButtonList>
    );
  }
}

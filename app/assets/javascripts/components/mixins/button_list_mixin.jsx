var ButtonListMixin = {
  renderFormTwoButtons: function(primaryText, secondaryText) {
    var buttonText = this.state.loading ? this.loadingIcon() : primaryText;
    return (
      <FormButtonList>
        <Button onClick={this.onSecondaryClick} className="Button--secondary" disabled={this.state.loading}>
          {secondaryText}
        </Button>
        <Button type="submit" className="Button--primary" disabled={!this.state.canSubmit || this.state.loading}>
          {buttonText}
        </Button>
      </FormButtonList>
    );
  }
}

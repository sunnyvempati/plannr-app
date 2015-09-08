import FormButtonList from '../generic/FormButtonList.jsx';
import Button from '../generic/Button.jsx';

var ButtonListMixin = {
  handleSecondaryClick(e) {
    e.preventDefault();
    this.onSecondaryClick();
  },
  renderFormTwoButtons(primaryText, secondaryText) {
    return (
      <FormButtonList>
        <Button type="button" onClick={this.handleSecondaryClick} className="Button--secondary">
          {secondaryText}
        </Button>
        <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
          {primaryText}
        </Button>
      </FormButtonList>
    );
  },
  renderFormButton(primaryText) {
    return (
      <FormButtonList>
        <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
          {primaryText}
        </Button>
      </FormButtonList>
    );
  },
  handleCreateAndNewClick() {
    this.createAndNewClicked = true;
  },
  renderCreateAndNewButtons() {
    return (
      <FormButtonList>
        <Button onClick={this.handleSecondaryClick} className="Button--secondary">
          Cancel
        </Button>
        <Button type="submit" className="Button--primary" disabled={this.state.disabled}>
          Create
        </Button>
        <Button onClick={this.handleCreateAndNewClick} type="submit" className="Button--primary" disabled={this.state.disabled}>
          Create and New
        </Button>
      </FormButtonList>
    );
  }
}

export default ButtonListMixin;

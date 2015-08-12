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
        <Button type="button" onClick={this.handleSecondaryClick} className="Button--secondary" disabled={this.state.disabled}>
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
  }
}

export default ButtonListMixin;

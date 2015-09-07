import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import CategoryInput from './CategoryInput';
import RouteActions from '../../actions/RouteActions';
import EventExpenseCategoryActions from '../../actions/EventExpenseCategoryActions';

var ExpenseCategoryForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  mapInputs: function (inputs) {
    return {
      'event_expense_category': {
        'expense_category_id': inputs.expense_category,
        'budget': inputs.budget,
        'event_id': this.props.params.id
      }
    };
  },
  postForm(data) {
    let budget = data.event_expense_category.budget;
    budget = !!budget && budget.toString().replace('$','').replace(/,/g,'');
    data.event_expense_category.budget = budget;
    EventExpenseCategoryActions.create(data);
  },
  onSuccess(result) {
    RouteActions.redirect('event_budget', {id: this.props.params.id});
  },
  onSecondaryClick() {
    this.onSuccess();
  },
  render: function() {
    let eventCategory = this.props.model || {};
    return (
      <div className="ExpenseCategoryFormContainer">
        <div className="FormContainer--leftAligned compact">
          <Form mapping={this.mapInputs}
                onSubmit={this.postForm}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                validationErrors={this.state.errors}
                resetErrors={this.resetErrors}>
            {this.renderFormTwoButtons('Save', 'Cancel')}
            <CategoryInput name='expense_category'
                           value={eventCategory.expense_category_id}
                           id='expense_category_input'
                           eventId={this.props.params.id}
                           autocompleteClassName='CompactAutocomplete'
                           className='CompactFormInput'
                           label='Name'
                           required />
            <FormInput
              name="budget"
              id="expense_category_budget"
              type="text"
              label="Budget"
              value={eventCategory.budget}
              placeholder="$0.00"
              validations="isCurrency"
              className='CompactFormInput'
              required
            />
          </Form>
        </div>
      </div>
    );
  }
});

export default ExpenseCategoryForm;

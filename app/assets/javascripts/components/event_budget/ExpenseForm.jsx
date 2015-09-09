import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import CategoryInput from './CategoryInput';
import RouteActions from '../../actions/RouteActions';
import RouteStore from '../../stores/RouteStore';
import ExpenseActions from '../../actions/ExpenseActions';
import ExpenseVendorInput from './ExpenseVendorInput';
import ExpenseCategoryInput from './ExpenseCategoryInput';
import TextAreaInput from '../generic/TextAreaInput';

var ExpenseForm = React.createClass({
  mixins: [FormMixin, ButtonListMixin],
  mapInputs: function (inputs) {
    return {
      'expense': {
        'name': inputs.name,
        'vendor_id': inputs.vendor,
        'event_expense_category_id': inputs.category,
        'notes': inputs.notes,
        'price': inputs.price,
        'quantity': inputs.quantity
      },
      'event_id': this.props.eventId
    };
  },
  postForm(data) {
    let price = data.expense.price;
    price = !!price && price.toString().replace('$','').replace(/,/g,'');
    data.expense.price = price;
    if (this.props.type == 'NEW') ExpenseActions.create(data);
    else ExpenseActions.update(this.props.model.id, data);
  },
  onSuccess(result) {
    if (this.createAndNewClicked) {
      window.location.reload();
    } else RouteActions.redirect('expense', {id: this.props.eventId, expense_id: result.id});
  },
  onSecondaryClick() {
    RouteActions.redirect('event_budget', {id: this.props.eventId});
  },
  renderButtonList: function() {
    if (this.props.type == "NEW") return this.renderCreateAndNewButtons();
    else return this.renderFormTwoButtons("Update", 'Cancel');
  },
  render: function() {
    let expense = this.props.model || {};
    let id = 'expense_form';
    return (
      <div className="ExpenseCategoryFormContainer">
        <div className="FormContainer--leftAligned compact">
          <Form mapping={this.mapInputs}
                onSubmit={this.postForm}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                validationErrors={this.state.errors}
                resetErrors={this.resetErrors}
                id={id}>
            <ExpenseCategoryInput name='category'
                                  value={expense.event_expense_category_id}
                                  id='expense_category_input'
                                  eventId={this.props.eventId}
                                  autocompleteClassName='CompactAutocomplete'
                                  className='CompactFormInput'
                                  label='Category'
                                  disabled={true}
                                  required />
            <FormInput
              id='expense_name'
              name='name'
              autofocus='autofocus'
              placeholder='What is the name of your expense?'
              type='text'
              label='Name*'
              value={expense.name}
              className="CompactFormInput"
              required />
            <ExpenseVendorInput name='vendor'
                                value={expense.vendor_id}
                                id='expense_vendor_input'
                                eventId={this.props.eventId}
                                autocompleteClassName='CompactAutocomplete'
                                className='CompactFormInput'
                                label='Vendor*'
                                required />
            <FormInput
              name="price"
              id="expense_category_price"
              type="text"
              label="Price*"
              value={expense.price}
              placeholder="$0.00"
              validations="isCurrency"
              className='CompactFormInput'
              required
            />
            <FormInput
              name="quantity"
              id="expense_quantity"
              type="text"
              label="Quantity*"
              value={expense.quantity}
              placeholder="How many?"
              validations="isNumeric"
              className='CompactFormInput'
              required
            />
            <TextAreaInput
              name="notes"
              form={id}
              value={expense.notes}
              label="Notes"
              placeholder="Add notes about this expense"
              className="CompactFormInput"
            />
            {this.renderButtonList()}
          </Form>
        </div>
      </div>
    );
  }
});

export default ExpenseForm;

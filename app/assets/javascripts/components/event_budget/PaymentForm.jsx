import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import FormMixin from '../mixins/FormMixin';
import PaymentActions from '../../actions/PaymentActions';
import moment from 'moment';
import DatePickerInput from '../generic/DatePickerInput';
import DropdownInput from '../generic/DropdownInput';
import classNames from 'classnames';

const PaymentForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      type: (this.props.model && this.props.model.type) || 1
    };
  },
  propTypes: {
    type: React.PropTypes.oneOf(['NEW', 'OLD']).isRequired,
    model: React.PropTypes.object.isRequired,
  },
  typeOptions:
  [
    {value: 1, display: 'Credit'},
    {value: 2, display: 'Debit'},
    {value: 3, display: 'Check'}
  ],
  paymentTypeChange: function(value) {
    this.setState({type: value});
  },
  mapInputs: function(inputs) {
    return {
      'payment': {
        'expense_id': this.props.expense.id,
        'due_date': inputs.due_date,
        'amount': inputs.amount,
        'method': inputs.type
      }
    };
  },
  onSuccess() {
    this.props.onSuccess();
  },
  onSecondaryClick: function() {
    this.props.onSecondaryClick();
  },
  formatDateAndSubmit: function(data, reset, invalidate) {
    let expense = this.props.expense;
    data.payment.due_date = data.payment.due_date && data.payment.due_date.format();
    let amount = data.payment.amount;
    amount = !!amount && amount.toString().replace('$','').replace(/,/g,'');
    data.payment.amount = amount;
    this.props.type == "NEW" ? PaymentActions.create(expense.id, data) : PaymentActions.update(this.props.model && this.props.model.id, expense.id, data);
  },
  render: function() {
    var payment = {};
    if (this.props.model) {
      var model = this.props.model;
      payment = {
        due_date: model.due_date,
        amount: model.amount,
        method: model.method
      };
    }
    return (
      <div className="FormContainer--leftAligned compact">
        <Form mapping={this.mapInputs}
              onSubmit={this.formatDateAndSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id='payment_form'>
          <FormInput
              name="amount"
              id="payment_amount"
              type="text"
              label="Amount*"
              value={payment.amount}
              placeholder="$0.00"
              validations="isCurrency"
              className='CompactFormInput'
              required
            />
          <DatePickerInput
            name="due_date"
            label="Due Date"
            value={ !!payment.due_date ? moment(payment.due_date) : null }
            placeholder="When's it due?"
            minDate={moment()}
            className="CompactFormInput"
          />
          <DropdownInput
            options={this.typeOptions}
            value={this.state.type}
            id='payment_type'
            name='type'
            label='Type'
            handleChange={this.paymentTypeChange}
            className='CompactFormInput'
            dropdownOptionsClass='DropdownMenu-options compact'
            dropdownItemClass='DropdownMenu-item compact'
          />
          {this.renderFormTwoButtons('Save', 'Cancel')}
        </Form>
      </div>
    );
  }
});

export default PaymentForm;

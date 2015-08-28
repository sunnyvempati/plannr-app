import ButtonListMixin from '../mixins/ButtonListMixin';
import Form from '../generic/Form';
import FormInput from '../generic/FormInput';
import RouteActions from '../../actions/RouteActions';
import FormMixin from '../mixins/FormMixin';
import VendorActions from '../../actions/VendorActions';
import VendorStore from '../../stores/VendorStore';
import classNames from 'classnames';
// to add
import VendorPrimaryContactInput from './VendorPrimaryContactInput';
import TextAreaInput from '../generic/TextAreaInput';

var VendorForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  getDefaultProps: function() {
    return {
      compact: false
    };
  },
  mapInputs: function(inputs) {
    return {
      'vendor': {
        'name': inputs.name,
        'location': inputs.location,
        'phone': inputs.phone,
        'primary_contact_id': inputs.primary_contact_id,
        'description': inputs.description
      }
    };
  },
  submitForm(data, reset, invalidate) {
    this.props.type == 'NEW' ? VendorActions.create(data) : VendorActions.update(this.props.model && this.props.model.id, data);
  },
  onSuccess: function (result) {
    !!this.props.onSuccess ? this.props.onSuccess(result) : RouteActions.redirect('vendor', {id: result.id});
  },
  onSecondaryClick: function() {
    !!this.props.onSecondaryClick ? this.props.onSecondaryClick() : RouteActions.redirect('vendors');
  },
  render: function() {
    var compact = this.props.compact;
    var vendor = {};
    if (this.props.model) {
      var model = this.props.model;
      vendor = {
        name: model.name,
        location: model.location,
        phone: model.phone,
        primary_contact_id: model.primary_contact_id,
        id: model.id,
        description: model.description
      };
    }
    var submitCallback = this.props.routeVerb == "POST" ? this.postForm : this.putForm;
    var primaryButtonText = this.props.type == "NEW" ? "Create" : "Update";
    var className = compact ? 'CompactFormInput' : 'FormInput';
    var formClasses = classNames({
      'FormContainer--leftAligned': true,
      'compact': this.props.compact
    });
    return (
      <div className={formClasses}>
        <Form mapping={this.mapInputs}
              onSubmit={this.submitForm}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              validationErrors={this.state.errors}
              resetErrors={this.resetErrors}
              id='vendor_form'>
          <FormInput
            id='vendor_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your vendor?'
            type='text'
            label='Name*'
            value={vendor.name}
            className={className}
            required
          />
          <FormInput
            id='vendor_location'
            name='location'
            placeholder='What is the location of your vendor?'
            type='text'
            label='Location'
            value={vendor.location}
            className={className}
          />
          <FormInput
            id='vendor_phone'
            name='phone'
            placeholder='xxx-xxx-xxxx'
            type='text'
            label='Phone'
            value={vendor.phone}
            className={className}
          />
          <VendorPrimaryContactInput
            name='primary_contact_id'
            value={vendor.primary_contact_id}
            id='vendor_primary_contact'
            label='Primary Contact'
            className={className}
            autocompleteClassName={this.props.compact ? 'CompactAutocomplete' : 'Autocomplete'}
          />
          <TextAreaInput
            id='vendor_description'
            name='description'
            className='TextAreaInput'
            label='Description'
            placeholder='What else do you need to know?'
            value={vendor.description}
            formId='contact_form'
            className={className}
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
});

export default VendorForm;

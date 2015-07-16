var ContactForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
    compact: React.PropTypes.bool
  },
  url: '/contacts.json',
  typeOptions:
  [
    {value: 1, display: 'Client'},
    {value: 2, display: 'Vendor'}
  ],
  getDefaultProps: function() {
    return {
      compact: false
    };
  },
  getInitialState: function() {
    return {
      category: this.props.model.category || 1
    };
  },
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'contact': {
        'name': inputs.name,
        'email': inputs.email,
        'category': inputs.category,
        'phone': inputs.phone,
        'organization': this.state.category == 1 ? inputs.organization : null,
        'description': inputs.description,
        'vendor_id': inputs.vendor
      }
    };
  },
  contactTypeOnChange: function(value) {
    this.setState({category: value});
  },
  vendorOrganizationField: function (contact, className) {
    // conditionally display either contact_organization field or contact_vendor
    // based on category (client or vendor)
    if (this.state.category == 1) {
      return (
        <FormInput
          id='contact_organization'
          name='organization'
          placeholder='What is the company of your contact?'
          type='text'
          label='Organization'
          className={className}
          value={contact.organization}
        />
      );
    }
    else {
      return (
        <ContactVendorInput
          name='vendor'
          value={contact.vendor_id}
          id='contact_vendor'
          label='Vendor'
          className={className}
          autocompleteClassName={this.props.compact ? 'CompactAutocomplete' : 'Autocomplete'}
        />
      );
    }
  },
  onSecondaryClick: function() {
    !!this.props.onSecondaryClick ? this.props.onSecondaryClick() : this.navigateToContacts();
  },
  navigateToContact: function(id) {
    location.href = '/contacts/#/view/'+id;
  },
  navigateToContacts: function() {
    location.href = '/contacts';
  },
  onSuccess: function (result) {
    !!this.props.onSuccess ? this.props.onSuccess(result, false) : this.navigateToContact(result.contact.id);
  },
  render: function () {
    var compact = this.props.compact;
    var contact = {};
    if (this.props.model) {
      var model = this.props.model;
      contact = {
        name: model.name,
        category: model.category,
        email: model.email,
        phone: model.phone,
        organization: model.organization,
        description: model.description,
        id: model.id,
        vendor_id: model.vendor_id
      };
    }
    this.putUrl = this.props.model && this.props.model.id && "/contacts/" + this.props.model.id + ".json";
    var submitCallback = this.props.routeVerb == "POST" ? this.postForm : this.putForm;
    var primaryButtonText = this.props.routeVerb == "POST" ? "Create" : "Update";
    var className = compact ? 'CompactFormInput' : 'FormInput';
    var formClasses = classNames({
      'FormContainer--leftAligned': true,
      'compact': this.props.compact
    });
    return (
      <div className={formClasses}>
        <Form mapping={this.mapInputs}
              authToken={this.props.authToken}
              onSubmit={submitCallback}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id='contact_form'>
          <FormInput
            id='contact_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your contact?'
            type='text'
            label='Name*'
            value={contact.name}
            className={className}
            required
          />
          <DropdownInput
            options={this.typeOptions}
            value={this.state.category}
            id='contact_type'
            name='category'
            label='Type*'
            handleContactChange={this.contactTypeOnChange}
            className={className}
            dropdownOptionsClass={compact ? 'DropdownMenu-options compact' : 'DropdownMenu-options'}
            dropdownItemClass={compact ? 'DropdownMenu-item compact' : 'DropdownMenu-item'}
            required
          />
          {this.vendorOrganizationField(contact, className)}
          <FormInput
            id='contact_email'
            name='email'
            placeholder='What is the email of your contact?'
            type='text'
            label='Email'
            value={contact.email}
            className={className}
          />
          <FormInput
            id='contact_phone'
            name='phone'
            placeholder='What is the phone of your contact?'
            type='tel'
            label='Phone'
            value={contact.phone}
            className={className}
          />
          <TextAreaInput
            id='contact_description'
            name='description'
            className='TextAreaInput'
            label='Description'
            placeholder='What else do you need to know?'
            value={contact.description}
            formId='contact_form'
            className={className}
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
})

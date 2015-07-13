var ContactForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    model: React.PropTypes.object
  },
  url: '/contacts.json',
  typeOptions:
  [
    <option key='1' value='1'>Client</option>,
    <option key='2' value='2'>Vendor</option>
  ],
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'contact': {
        'name': inputs.name,
        'email': inputs.email,
        'category': inputs.category,
        'phone': inputs.phone,
        'organization': inputs.organization,
        'description': inputs.description,
        'vendor_id': inputs.vendor
      }
    };
  },
  contactTypeOnChange: function(value) {
    this.setState({category: value});
  },
  vendorOrganizationField: function (category, contact, propsDisableForm) {
    // conditionally display either contact_organization field or contact_vendor
    // based on category (client or vendor)
    var retHtml;
    if (this.state.category == 1) {
      retHtml = <FormInput
                  id='contact_organization'
                  name='organization'
                  placeholder='What is the company of your contact?'
                  type='text'
                  label='Organization'
                  value={contact.organization}
                  disabled={propsDisableForm}
                  />;
    }
    else {
      retHtml = <VendorFormInputAutocomplete
                  name='vendor'
                  value={contact.vendor_id}
                  id='contact_vendor'
                  label='Vendor'
                  disabled={propsDisableForm}
                  />;
    }
    return retHtml;
  },
  getInitialState: function() {
    return {
      category: this.props.model.category || 1
    };
  },
  onSecondaryClick: function() {
    location.href = "/contacts";
  },
  onSuccess: function (result) {
    location.href = '/contacts/#/view/'+result.contact.id;
  },
  render: function () {
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
    var submitCallback = this.props.actionVerb == "POST" ? this.postForm : this.putForm;
    return (
      <div className='FormContainer--leftAligned'>
        <Form mapping={this.mapInputs}
              authToken={this.props.authToken}
              onSubmit={submitCallback}
              onValid={this.enableButton}
              onInvalid={this.disabledButton}
              id='contact_form'>
          <FormInput
            id='contact_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your contact?'
            type='text'
            label='Name*'
            value={contact.name}
            required
          />
          <FormSelectInput
            id='contact_type'
            name='category'
            className='SelectInput'
            label='Type*'
            options={this.typeOptions}
            value={contact.category || 1}
            disabled={this.props.disableForm}
            onChangeCallback={this.contactTypeOnChange}
            required
          />
          { this.vendorOrganizationField(this.state.category, contact, this.props.disableForm) }
          <FormInput
            id='contact_email'
            name='email'
            placeholder='What is the email of your contact?'
            type='text'
            label='Email'
            value={contact.email}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_phone'
            name='phone'
            placeholder='What is the phone of your contact?'
            type='tel'
            label='Phone'
            value={contact.phone}
            disabled={this.props.disableForm}
          />
          <TextAreaInput
            id='contact_description'
            name='description'
            className='TextAreaInput'
            label='Description'
            placeholder='What else do you need to know?'
            value={contact.description}
            disabled={this.props.disableForm}
            formId='contact_form'
          />
          {this.renderFormTwoButtons()}
        </Form>
      </div>
    );
  }
})

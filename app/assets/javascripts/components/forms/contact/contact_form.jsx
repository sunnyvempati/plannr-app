var ContactForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    showButtonList: React.PropTypes.bool.isRequired,

    disableForm: React.PropTypes.bool,
    model: React.PropTypes.object,
    secondaryButtonHref: React.PropTypes.string
  },
  hrefRoot: '/contacts',
  typeOptions: [<option key='1' value='1'>Client</option>, <option key='2' value='2'>Vendor</option>],
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
                  label='organization'
                  value={contact.organization}
                  disabled={propsDisableForm}
                  />;
    }
    else {
      retHtml = <VendorFormInputAutocomplete
                  name='vendor'
                  value={contact.vendor_id}
                  id='contact_vendor'
                  label='vendor'
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

    return (
      <div className='FormContainer--leftAligned'>
        <Form url={this.props.action}
          mapping={this.mapInputs}
          onSuccess={this.props.onSuccess}
          routeVerb={this.props.routeVerb}
          authToken={this.props.authToken}
          primaryButtonText={this.props.primaryButtonText}
          secondaryButtonVisible={this.props.secondaryButtonVisible}
          secondaryButtonHref={this.props.secondaryButtonHref}
          showButtonList={this.props.showButtonList}
          id='contact_form'>

          <FormInput
            id='contact_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your contact?'
            type='text'
            label='name*'
            value={contact.name}
            disabled={this.props.disableForm}
            required
          />
          <FormSelectInput
            id='contact_type'
            name='category'
            className='SelectInput'
            label='type*'
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
            label='email'
            value={contact.email}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_phone'
            name='phone'
            placeholder='What is the phone of your contact?'
            type='tel'
            label='phone'
            value={contact.phone}
            disabled={this.props.disableForm}
          />
          <TextAreaInput
            id='contact_description'
            name='description'
            className='TextAreaInput'
            label='description'
            placeholder='What else do you need to know?'
            value={contact.description}
            disabled={this.props.disableForm}
            formId='contact_form'
          />

        </Form>

        <a href={this.hrefRoot }>List</a>
        |
        <a href={this.hrefRoot + '/' + contact.id + '/edit' }>Edit</a>
        |
        <a href={this.hrefRoot + '/' + contact.id  }>Show</a>
      </div>
    );
  }
})

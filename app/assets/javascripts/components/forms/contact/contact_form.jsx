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
  contactTypeOptions: [<option key='1' value='1'>Client</option>, <option key='2' value='2'>Vendor</option>],
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'contact': {
        'name': inputs.name,
        'email': inputs.email,
        'contact_type': inputs.contact_type,
        'phone': inputs.phone,
        'contact_company': inputs.contact_company,
        'description': inputs.description
      }
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
  },
  render: function () {
    var vendor = {};
    if (this.props.model) {
      var model = this.props.model;
      vendor = {
        name: vendor.name,
        contactType: vendor.contact_type,
        email: vendor.email,
        phone: vendor.phone,
        contactCompany: vendor.contact_company,
        description: vendor.description,
        id: vendor.id
      };
    }
    return (
      <div className='FormContainer--leftAligned'>
        <Form url={this.props.action}
          mapping={this.mapInputs}
          onSuccess={this.changeUrl}
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
            value={vendor.name}
            disabled={this.props.disableForm}
            required
          />
          <FormSelectInput
            id='contact_contact_type'
            name='contact_type'
            className='SelectInput'
            label='type*'
            options={this.contactTypeOptions}
            value={vendor.contactType}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            id='contact_email'
            name='email'
            placeholder='What is the email of your contact?'
            type='text'
            label='email'
            value={vendor.email}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_phone'
            name='phone'
            placeholder='What is the phone of your contact?'
            type='tel'
            label='phone'
            value={vendor.phone}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_contact_company'
            name='contact_company'
            placeholder='What is the company of your contact?'
            type='text'
            label='company'
            value={vendor.contactCompany}
            disabled={this.props.disableForm}
          />
          <TextAreaInput
            id='contact_description'
            name='description'
            className='TextAreaInput'
            label='description'
            placeholder='What else do you need to know?'
            value={vendor.description}
            disabled={this.props.disableForm}
            formId='contact_form'
          />

        </Form>

        <a href={this.hrefRoot }>List</a>
        |
        <a href={this.hrefRoot + '/' + vendor.id + '/edit' }>Edit</a>
        |
        <a href={this.hrefRoot + '/' + vendor.id  }>Show</a>
      </div>
    );
  }
})

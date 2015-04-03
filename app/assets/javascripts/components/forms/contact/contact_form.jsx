var ContactForm = React.createClass({
  hrefRoot: '/contacts',
  contactTypeOptions: [ {value: '1', text: 'Client'}, {value: '2', text: 'Vendor'}],
  mapInputs: function (inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'contact': {
        'name': inputs.name,
        'email': inputs.email,
        'contact_type': inputs.contact_type,
        'phone': inputs.phone,
        'company': inputs.company,
        'description': inputs.description
      }
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
  },
  render: function () {
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
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <SelectInput
            id='contact_contact_type'
            name='contact_type'
            className='SelectInput'
            label='type*'
            options={this.contactTypeOptions}
            value={this.props.model.contact_type}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            id='contact_email'
            name='email'
            placeholder='What is the email of your contact?'
            type='text'
            label='email'
            value={this.props.model.email}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_phone'
            name='phone'
            placeholder='What is the phone of your contact?'
            type='tel'
            label='phone'
            value={this.props.model.phone}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='contact_company'
            name='company'
            placeholder='What is the company of your contact?'
            type='text'
            label='company'
            value={this.props.model.company}
            disabled={this.props.disableForm}
          />
          <TextAreaInput
            name='description'
            id='contact_description'
            className='TextAreaInput'
            label='description'
            placeholder='What else do you need to know?'
            value={this.props.model.description}
            disabled={this.props.disableForm}
            formId='contact_form'
          />

        </Form>

        <a href={this.hrefRoot }>List</a>
        |
        <a href={this.hrefRoot + '/' + this.props.model.id + '/edit' }>Edit</a>
        |
        <a href={this.hrefRoot + '/' + this.props.model.id  }>Show</a>
      </div>
    );
  }
});


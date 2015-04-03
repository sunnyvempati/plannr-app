var VendorForm = React.createClass({
  hrefRoot: '/vendors',
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'vendor': {
        'name': inputs.name,
        'location': inputs.location,
        'phone': inputs.phone,
        'primary_contact': inputs.primary_contact
      }
    };
  },
  changeUrl: function () {
    location.href = this.hrefRoot;
  },
  render: function() {
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
          id='vendor_form'>

          <FormInput
            id='vendor_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your vendor?'
            type='text' 
            label='name*'
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            id='vendor_location'
            name='location'
            placeholder='What is the location of your vendor?'
            type='text' 
            label='vendor_location'
            value={this.props.model.location}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='vendor_phone'
            name='phone'
            placeholder='What is the phone of your vendor?'
            type='text'
            label='phone'
            value={this.props.model.phone}
            disabled={this.props.disableForm}
          />
          <FormInput
            id='vendor_primary_contact'
            name='primary_contact'
            placeholder='Who is the primary_contact of your vendor?'
            type='text'
            label='primary_contact'
            value={this.props.model.primary_contact}
            disabled={this.props.disableForm}
          />

        </Form>

        <a href={this.hrefRoot }>List</a>|
        <a href={this.hrefRoot + '/' + this.props.model.id + '/edit' }>Edit</a>|
        <a href={this.hrefRoot + '/' + this.props.model.id  }>Show</a>
      </div>
    );
  }
});

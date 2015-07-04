var VendorForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    authToken: React.PropTypes.string.isRequired,
    primaryButtonText: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST', 'GET']).isRequired,
    secondaryButtonVisible: React.PropTypes.bool.isRequired,
    showButtonList: React.PropTypes.bool.isRequired,

    disableForm: React.PropTypes.bool,
    model: React.PropTypes.object,
    secondaryButtonHref: React.PropTypes.string
  },
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'vendor': {
        'name': inputs.name,
        'location': inputs.location,
        'phone': inputs.phone,
        'primary_contact_id': inputs.primary_contact_id,
        'description': inputs.description
      }
    };
  },
  render: function() {
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
              id='vendor_form'>

          <FormInput
            id='vendor_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your vendor?'
            type='text'
            label='Name*'
            value={vendor.name}
            disabled={this.props.disableForm}
            required/>
          <FormInput
            id='vendor_location'
            name='location'
            placeholder='What is the location of your vendor?'
            type='text'
            label='Location'
            value={vendor.location}
            disabled={this.props.disableForm}/>
          <FormInput
            id='vendor_phone'
            name='phone'
            placeholder='What is the phone of your vendor?'
            type='text'
            label='Phone'
            value={vendor.phone}
            disabled={this.props.disableForm}/>
          <PrimaryContactInput
            name='primary_contact_id'
            value={vendor.primary_contact_id}
            id='vendor_primary_contact'
            label='Primary Contact'/>
          <TextAreaInput
            id='vendor_description'
            name='description'
            className='TextAreaInput'
            label='Description'
            placeholder='What else do you need to know?'
            value={vendor.description}
            disabled={this.props.disableForm}
            formId='contact_form'/>
        </Form>
      </div>
    );
  }
});

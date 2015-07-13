var VendorForm = React.createClass({
  mixins: [
    FormMixin,
    ButtonListMixin,
    React.addons.PureRenderMixin
  ],
  propTypes: {
    authToken: React.PropTypes.string.isRequired,
    routeVerb: React.PropTypes.oneOf(['POST'], ['GET']).isRequired,
    model: React.PropTypes.object
  },
  url: '/vendors.json',
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
  onSuccess: function (result) {
    location.href = '/vendors/#/view/'+result.vendor.id;
  },
  onSecondaryClick: function() {
    location.href = "/vendors";
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
    this.putUrl = this.props.model && this.props.model.id && "/vendors/" + this.props.model.id + ".json";
    var submitCallback = this.props.routeVerb == "POST" ? this.postForm : this.putForm;
    var primaryButtonText = this.props.routeVerb == "POST" ? "Create" : "Update";
    return (
      <div className='FormContainer--leftAligned'>
        <Form mapping={this.mapInputs}
              authToken={this.props.authToken}
              onSubmit={submitCallback}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              id='vendor_form'>
          <FormInput
            id='vendor_name'
            name='name'
            autofocus='autofocus'
            placeholder='What is the name of your vendor?'
            type='text'
            label='Name*'
            value={vendor.name}
            required
          />
          <FormInput
            id='vendor_location'
            name='location'
            placeholder='What is the location of your vendor?'
            type='text'
            label='Location'
            value={vendor.location}
          />
          <FormInput
            id='vendor_phone'
            name='phone'
            placeholder='What is the phone of your vendor?'
            type='text'
            label='Phone'
            value={vendor.phone}
          />
          <PrimaryContactInput
            name='primary_contact_id'
            value={vendor.primary_contact_id}
            id='vendor_primary_contact'
            label='Primary Contact' />
          <TextAreaInput
            id='vendor_description'
            name='description'
            className='TextAreaInput'
            label='Description'
            placeholder='What else do you need to know?'
            value={vendor.description}
            formId='contact_form'
          />
          {this.renderFormTwoButtons(primaryButtonText, 'Cancel')}
        </Form>
      </div>
    );
  }
});

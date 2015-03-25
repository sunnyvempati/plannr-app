var VendorForm = React.createClass({
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
  changeUrl: function() {
    location.href = '/vendors';
  },
  render: function() {
    return (
      <Form url={this.props.action}
            mapping={this.mapInputs}
            onSuccessUrl='/vendors'
            routeVerb={this.props.routeVerb}
            authToken={this.props.authToken}
            primaryButtonText={this.props.primaryButtonText}
            secondaryButtonVisible={this.props.secondaryButtonVisible}
            secondaryButtonHref={this.props.secondaryButtonHref}
            showButtonList={this.props.showButtonList}>

        <FormInput  name="name"
                    autofocus="autofocus"
                    placeholder="What is the name of your vendor?"
                    type="text"
                    label="name"
                    value={this.props.model.name}
                    disabled={this.props.disableForm}
                    required/>
        <FormInput  name="location"
                    autofocus="off"
                    placeholder="Where is the vendor located?"
                    type="text"
                    label="location"
                    value={this.props.model.location}
                    disabled={this.props.disableForm} />
        <FormInput  name="phone" autofocus="off"
                    placeholder="What is the phone number for this vendor?"
                    type="text"
                    label="phone"
                    value={this.props.model.phone}
                    disabled={this.props.disableForm} />
        <FormInput  name="primary_contact" autofocus="off"
                    placeholder="Who is the primary contact?"
                    type="text"
                    label="primary contact"
                    value={this.props.model.primary_contact}
                    disabled={this.props.disableForm} />
      </Form>
    );
  }
});

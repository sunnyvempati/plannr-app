var ContactForm = React.createClass({
  hrefRoot: "/contacts",
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
    var id = 'contact_form';
    return (
      <div className="FormContainer--leftAligned">
        <Form url={this.props.action}
          mapping={this.mapInputs}
          onSuccess={this.changeUrl}
          routeVerb={this.props.routeVerb}
          authToken={this.props.authToken}
          primaryButtonText={this.props.primaryButtonText}
          secondaryButtonVisible={this.props.secondaryButtonVisible}
          secondaryButtonHref={this.props.secondaryButtonHref}
          showButtonList={this.props.showButtonList}
          id={id}>

          <FormInput
            id="contact_name"
            name="name"
            autofocus="autofocus"
            placeholder="What is the name of your contact?"
            type="text"
            label="name*"
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />
          <FormInput
            id="contact_email"
            name="email"
            placeholder="What is the email of your contact?"
            type="text"
            label="contact_email"
            value={this.props.model.email}
            disabled={this.props.disableForm}
          />
          <FormInput
            id="contact_contact_type"
            name="contact_type"
            placeholder="What type of contact (client or vendor)?"
            type="text"
            label="type"
            value={this.props.model.contact_type}
            disabled={this.props.disableForm}
          />
          <FormInput
            id="contact_phone"
            name="phone"
            placeholder="What is the phone of your contact?"
            type="text"
            label="phone"
            value={this.props.model.phone}
            disabled={this.props.disableForm}
          />
          <FormInput
            id="contact_company"
            name="company"
            placeholder="What is the company of your contact?"
            type="text"
            label="company"
            value={this.props.model.company}
            disabled={this.props.disableForm}
          />
          <TextAreaInput
            name="description"
            id="contact_description"
            className="TextAreaInput"
            label="description"
            placeholder="What else do you need to know?"
            value={this.props.model.description}
            disabled={this.props.disableForm}
            formId={id}
          />
        </Form>

        <a href={this.props.hrefRoot }>List</a>
        |
        <a href={this.props.hrefRoot + "/" + this.props.model.id + "/edit" }>Edit</a>
        |
        <a href={this.props.hrefRoot + "/" + this.props.model.id  }>Show</a>
      </div>
    );
  }
});


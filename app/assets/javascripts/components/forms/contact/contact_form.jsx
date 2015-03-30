var ContactForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'contact': {
        'name': inputs.name

      }
    };
  },
  changeUrl: function() {
    location.href = '/contacts';
  },
  render: function() {
    return (
      <div className="FormContainer--leftAligned">
        <Form url={this.props.action}
          mapping={this.mapInputs}
          onSuccessUrl='/contacts'
          routeVerb={this.props.routeVerb}
          authToken={this.props.authToken}
          primaryButtonText={this.props.primaryButtonText}
          secondaryButtonVisible={this.props.secondaryButtonVisible}
          secondaryButtonHref={this.props.secondaryButtonHref}
          showButtonList={this.props.showButtonList}>

          <FormInput
            name="name"
            autofocus="autofocus"
            placeholder="What is the name of your contact?"
            type="text" label="name"
            value={this.props.model.name}
            disabled={this.props.disableForm}
            required
          />

        </Form>
      </div>
    );
  }
});

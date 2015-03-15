var TaskForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'authenticity_token': inputs.authenticity_token,
      'task': {
        'name': inputs.name,
        'description': inputs.description,
        'deadline': inputs.deadline
      }
    };
  },

  getInitialState: function() {
    return {canSubmit: false};
  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },

  changeUrl: function() {
    location.href = '/tasks';
  },

  hiddenFields: function() {
    return (
      <FormInput type="hidden" name={this.props.authParam} value={this.props.authToken} />
    )
  },

  render: function() {
    hidden_fields = this.props.disableForm ? "" : this.hiddenFields();
    return (
      <div className="FormContainer">
        <Formsy.Form  url={this.props.action}
                      onSuccess={this.changeUrl}
                      onValid={this.enableButton}
                      onInvalid={this.disableButton}
                      mapping={this.mapInputs}
                      method={this.props.routeVerb}
          xxx={this.props.disableForm}
                       >
            {hidden_fields}
            <FormInput  name="name"
                        autofocus="autofocus"
                        placeholder="What is the name of your task?"
                        type="text" label="name"
                        value={this.props.model.name}
                        disabled={this.props.disableForm}
                        required/>
            <FormInput  name="description"
                        autofocus="off"
                        placeholder="How would you describe this task?"
                        type="text" label="description"
                        value={this.props.model.description}
                        disabled={this.props.disableForm} />
            <FormInput  name="deadline" autofocus="off"
                        placeholder="What is the deadline for this task? (DD/MM/YYYY)"
                        type="datetime"
                        label="deadline"
                        value={this.props.model.deadline}
                        disabled={this.props.disableForm} />
            <ButtonList showButtonList={this.props.showButtonList}
                        primaryButtonText={this.props.primaryButtonText}
                        secondaryButtonVisible={this.props.secondaryButtonVisible}
                        secondaryButtonHref={this.props.secondaryButtonHref}
                        secondaryButtonText="Cancel"   />
        </Formsy.Form>
      </div>
    );
  }
});

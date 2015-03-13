var TaskForm = React.createClass({
  mapInputs: function(inputs) {
    return {
      'name': inputs.name,
      'description': inputs.description,
      'deadline': inputs.deadline
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

  render: function() {
    return (
      <div className="FormContainer">
        <Formsy.Form url='/user_session' onSuccess={this.changeUrl} onValid={this.enableButton} onInvalid={this.disableButton}>
          <FormInput type="hidden" name={this.props.auth_param} value={this.props.auth_token} />
          <FormInput name="name" autofocus="autofocus" placeholder="What is the name of your task?" type="text" label="name" value={this.props.model.name} required/>
          <FormInput name="description" autofocus="off" placeholder="How would you describe this task?" type="text" label="description" value={this.props.model.description} />
          <FormInput name="deadline" autofocus="off" placeholder="What is the deadline for this task? (DD/MM/YYYY)" type="datetime" label="deadline" value={this.props.model.deadline} />
          <ButtonList secondaryVisible={true}
                      secondaryBtnHref={this.secondary_button_href}
                      secondaryBtnText="Cancel"
                      primaryBtnText={this.props.primary_button_text}
                      action={this.props.action} />
        </Formsy.Form>
      </div>
    );
  }
});

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
  changeUrl: function() {
    location.href = '/tasks';
  },
  render: function() {
    return (
      <div className="FormContainer--leftAligned">
        <Form url={this.props.action}
              mapping={this.mapInputs}
              onSuccessUrl='/tasks'
              routeVerb={this.props.routeVerb}
              authToken={this.props.authToken}
              primaryButtonText={this.props.primaryButtonText}
              secondaryButtonVisible={this.props.secondaryButtonVisible}
              secondaryButtonHref={this.props.secondaryButtonHref}
              showButtonList={this.props.showButtonList}>

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
        </Form>
      </div>
    );
  }
});

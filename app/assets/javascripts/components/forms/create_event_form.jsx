var CreateEventForm = React.createClass({
  componentDidMount: function() {
    $("#start_date").datepicker();
  },
  render: function() {
    return (
      <Form action={this.props.action} method="post" id="new_event" submitBtnText="Create event">
        <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
        <FormInput name="event[name]" autofocus="autofocus" placeholder="Name of your event" type="text" label="name" onClick={this.blah} />
        <FormInput name="event[client_name]" autofocus="off" placeholder="Who is it for?" type="text" label="client_name" />
        <FormInput name="event[start_date]" autofocus="off" placeholder="When is it?" type="datetime" label="start_date" id="start_date" />
        <FormInput name="event[location]" autofocus="off" placeholder="Where is it?" type="text" label="location" />
        <FormInput name="event[budget]" autofocus="off" placeholder="What's the budget?" type="decimal" label="budget" id="budget" />
      </Form>
    );
  }
});

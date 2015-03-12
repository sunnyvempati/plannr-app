var CreateTaskForm = React.createClass({
    displayName: "CreateTaskForm",


    //getInitialState: function () {
    //    return {
    //        name: this.props.task.name,
    //        description: this.props.task.description,
    //        deadline: this.props.task.deadline
    //    };
    //},
    //
    //onChange: function(e) {
    //    this.setState({text: e.target.value});
    //},

    render: function() {
        return (
            <Form action={this.props.action} method="post" id="new_task" submitBtnText="Create task">
                <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
                <FormInput name="task[name]" autofocus="autofocus" placeholder="Name of your task" type="text" label="name" />
                <FormInput name="task[description]" autofocus="off" placeholder="???" type="text" label="description" />
                <FormInput name="task[deadline]" autofocus="off" placeholder="When is it due?" type="datetime" label="deadline" />

            </Form>
        );
    }


});

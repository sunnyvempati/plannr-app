var EditTaskForm = React.createClass({
    displayName: "EditTaskForm",

    getInitialState: function () {
        return {
            name: this.props.task.name,
            description: this.props.task.description,
            deadline: this.props.task.deadline
        };
    },

    onChangeName: function(e) {
        this.setState({name: e.target.value});
    },

    onChangeDescription: function(e) {
        this.setState({description: e.target.value});
    },

    onChangeDeadline: function(e) {
        this.setState({deadline: e.target.value});
    },

    render: function() {
        return (
            <Form action={this.props.action} method="POST" id="update_task" submitBtnText="Update task">
                <input name="_method" type="hidden" value="patch" />
                <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
                <FormInput name="task[name]" autofocus="autofocus" placeholder="" type="text" label="name" value={this.state.name} onChange={this.onChangeName} />
                <FormInput name="task[description]" autofocus="off" placeholder="" type="text" label="description" value={this.state.description} onChange={this.onChangeDescription} />
                <FormInput name="task[deadline]" autofocus="off" placeholder="" type="datetime" label="deadline" value={this.state.deadline} onChange={this.onChangeDeadline} />

            </Form>
        );
    }


    //render: function () {
    //
    //    return (
    //        React.createElement(Form, {
    //                action: this.props.action,
    //                method: this.props.method,
    //                id: this.props.id,
    //                submitBtnText: this.props.submitButtonText
    //            },
    //            React.createElement(HiddenAuthFields, {
    //                auth_param: this.props.auth_param,
    //                auth_token: this.props.auth_token
    //            }),
    //            React.createElement(FormInput, {
    //                name: "task[name]",
    //                autofocus: "autofocus",
    //                placeholder: "What is your task called?",
    //                type: "text",
    //                label: "name",
    //                value: this.state.name
    //            }),
    //            React.createElement(FormInput, {
    //                name: "task[description]",
    //                autofocus: "off",
    //                placeholder: "Can you describe it for me?",
    //                type: "text",
    //                label: "description",
    //                value: this.state.description
    //            }),
    //            React.createElement(FormInput, {
    //                name: "task[deadline]",
    //                autofocus: "off",
    //                placeholder: "When is it due?",
    //                type: "datetime",
    //                label: "dealine",
    //                value: this.state.deadline
    //            })
    //        )
    //    );
    //}
});

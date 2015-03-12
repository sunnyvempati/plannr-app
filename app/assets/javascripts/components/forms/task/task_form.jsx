var TaskForm = React.createClass({
    displayName: "TaskForm",

    getInitialState: function () {
        //return populated object on show/edit/update methods put or patch or get
        var retStateObject = {
            name: null,
            description: null,
            deadline: null
        }

        if (this.props.method.toLowerCase() !== 'post' ) {
            retStateObject.name = this.props.task.name;
            retStateObject.description = this.props.task.description;
            retStateObject.deadline = this.props.task.deadline;
        }

        return retStateObject;
    },

    onChangeName: function (e) {
        this.setState({name: e.target.value});
    },

    onChangeDescription: function (e) {
        this.setState({description: e.target.value});
    },

    onChangeDeadline: function (e) {
        this.setState({deadline: e.target.value});
    },

    render: function () {
        var all_props = this.props;
        return (
            <Form action={this.props.action} method={this.props.formMethod} id={this.props.formId} submitBtnText={this.props.submitButtonText} {...all_props }>
                <input name="_method" type="hidden" value={this.props.method} />
                <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
                <FormInput name="task[name]" autofocus="autofocus" placeholder="What is the name of your task?" type="text" label="name" value={this.state.name} onChange={this.onChangeName} />
                <FormInput name="task[description]" autofocus="off" placeholder="How would you describe this task?" type="text" label="description" value={this.state.description} onChange={this.onChangeDescription} />
                <FormInput name="task[deadline]" autofocus="off" placeholder="What is the deadline for this task? (DD/MM/YYYY)" type="datetime" label="deadline" value={this.state.deadline} onChange={this.onChangeDeadline} />

            </Form>
        );
    }


});

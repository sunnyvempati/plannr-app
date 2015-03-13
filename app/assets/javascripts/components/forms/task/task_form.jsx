var TaskForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    displayName: "TaskForm",

    getInitialState: function () {
        //return populated object on show/edit/update methods put or patch or get
        var retStateObject = {
            name: null,
            description: null,
            deadline: null
        }

        if (this.props.route_verb.toLowerCase() === 'patch' || this.props.route_verb.toLowerCase() === 'put' || this.props.route_verb.toLowerCase() === 'get') {
            retStateObject.name = this.props.task.name;
            retStateObject.description = this.props.task.description;
            retStateObject.deadline = this.props.task.deadline;
        }

        return retStateObject;
    },

    render: function () {
        var all_props = this.props;
        return (
            <Form action={this.props.action} method={this.props.method} id={this.props.form_id}  {...all_props }>
                <input name="_method" type="hidden" value={this.props.route_verb} />
                <HiddenAuthFields auth_param={this.props.auth_param} auth_token={this.props.auth_token} />
                <FormInput name="task[name]" autofocus="autofocus" placeholder="What is the name of your task?" type="text" label="name" valueLink={this.linkState('name')} />
                <FormInput name="task[description]" autofocus="off" placeholder="How would you describe this task?" type="text" label="description" valueLink={this.linkState('description')} />
                <FormInput name="task[deadline]" autofocus="off" placeholder="What is the deadline for this task? (DD/MM/YYYY)" type="datetime" label="deadline" valueLink={this.linkState('deadline')} />

            </Form>
        );
    }


});

var EventTemplateInput = React.createClass({
  mixins: [
    Formsy.Mixin,
    React.addons.PureRenderMixin
  ],
  getInitialState: function() {
    return {
      useTemplate: false
    };
  },
  eventSelected: function(item) {
    var value = this.getValue();
    value.parent_event_id = item.id;
    this.setValue(value);
    this.props.eventTemplateSelected(item);
  },
  activateTemplate: function(checked) {
    this.setValue({
      parent_event_id: null,
      contacts: checked,
      vendors: checked,
      comments: checked,
      tasks: checked
    });
    this.setState({useTemplate: checked});
  },
  handleTemplateItemsCheckChange: function(checked, entity) {
    var value = this.getValue();
    value[entity] = checked;
    this.setValue(value);
  },
  render: function() {
    var value = this.getValue();
    var containerClasses = classNames({
      'EventTemplateInputContainer': true,
      'show': this.state.useTemplate
    });
    return (
      <div className={containerClasses}>
        <CheckboxInput checked={this.state.useTemplate}
                       checkboxDisplay={<div className="TemplateText">Use previous event as a template</div>}
                       onChange={this.activateTemplate} />
        <TaskEventInput
          name='parent_id'
          id='task_parent_id'
          label='Event to use as template'
          value={value.parent_event_id}
          handleItemSelected={this.eventSelected} />
        <div className="TemplateText pad"> What should be copied over? </div>
        <div className="TemplateCheckboxes">
          <CheckboxInput checked={!!value.contacts}
                         checkboxDisplay={<div className="TemplateText">Contacts</div>}
                         value="contacts"
                         onChange={this.handleTemplateItemsCheckChange} />
          <CheckboxInput checked={!!value.vendors}
                         value="vendors"
                         checkboxDisplay={<div className="TemplateText">Vendors</div>}
                         onChange={this.handleTemplateItemsCheckChange} />
          <CheckboxInput checked={!!value.tasks}
                         value="tasks"
                         checkboxDisplay={<div className="TemplateText">Tasks</div>}
                         onChange={this.handleTemplateItemsCheckChange} />
          <CheckboxInput checked={!!value.comments}
                         value="comments"
                         checkboxDisplay={<div className="TemplateText">Comments</div>}
                         onChange={this.handleTemplateItemsCheckChange} />
        </div>
      </div>
    );
  }
});

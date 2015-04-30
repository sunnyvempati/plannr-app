var FormAutocompleteInput = React.createClass({
  getInitialState: function() {
    return {
      userAssigned: false,
      assignedToName: null
    };
  },
  mixins: [Formsy.Mixin],
  retrieveAllUsers: function(request, response) {
    $.get("/search_users", {search: {text: request.term}}, function(result) {
      response(result.users);
    }.bind(this));
  },
  autocompleteUserList: function(item) {
    return $("<li>").append(item.name);
  },
  addToForm: function(ui, user) {
    this.setValue(user.item.id);
    this.setState({userAssigned: true, assignedToName: user.item.name});
  },
  editAssignedTo: function() {
    this.setState({userAssigned: false, assignedToName: null});
  },
  renderAutocomplete: function() {
    return (
      <div className="FormAutocompleteInput">
        <Autocomplete name={this.props.name}
                      retrieveDataAsync={this.retrieveAllUsers}
                      renderAutoCompleteList={this.autocompleteUserList}
                      itemSelected={this.addToForm} />
      </div>
    );
  },
  renderAssigned: function() {
    return (
      <div className="FormInputAssignedTo">
        <span>Assigned to:</span>
        <span>{this.state.assignedToName}</span>
        <div onClick={this.editAssignedTo}>
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.userAssigned ? this.renderAssigned() : this.renderAutocomplete();
    return inputRender;
  }
});
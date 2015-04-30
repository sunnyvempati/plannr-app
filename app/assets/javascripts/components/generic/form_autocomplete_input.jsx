var FormAutocompleteInput = React.createClass({
  getInitialState: function() {
    return {
      userAssigned: false,
      assignedToName: null,
      users: []
    };
  },
  mixins: [Formsy.Mixin],
  componentDidMount: function() {
    var assignedToValue = this.getValue();
    if (assignedToValue) {
      $.get("/users/" + assignedToValue, function(result) {
        this.setState({userAssigned: true, assignedToName: result.user.name});
      }.bind(this))
    }
  },
  retrieveAllUsers: function(term) {
    $.get("/search_users", {search: {text: term || ""}}, function(result) {
      this.setState({users: result.users});
    }.bind(this));
  },
  userItem: function(item) {
    return (
      <div className="Autocomplete-resultsItem">{item.name}</div>
    );
  },
  addToForm: function(user) {
    this.setValue(user.id);
    this.setState({userAssigned: true, assignedToName: user.name});
  },
  editAssignedTo: function() {
    this.setState({userAssigned: false, assignedToName: null, users: []});
  },
  renderAutocomplete: function() {
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        <Autocomplete name={this.props.name}
                      retrieveData={this.retrieveAllUsers}
                      itemSelected={this.addToForm}
                      data={this.state.users} />
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

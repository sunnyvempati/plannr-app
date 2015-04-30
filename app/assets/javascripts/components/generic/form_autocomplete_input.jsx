var FormAutocompleteInput = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      userAssigned: false,
      assignedToName: null,
      users: [],
      focus: false // this is used when you click editAssignedTo
    };
  },
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
    this.setState({userAssigned: false, assignedToName: null, users: [], focus: true});
  },
  renderAutocomplete: function() {
    return (
      <Autocomplete name={this.props.name}
                    retrieveData={this.retrieveAllUsers}
                    itemSelected={this.addToForm}
                    data={this.state.users}
                    focus={this.state.focus} />
    );
  },
  renderAssigned: function() {
    return (
      <div className="Autocomplete-picked" onClick={this.editAssignedTo}>
        <div className="Autocomplete-pickedName">
          {this.state.assignedToName}
        </div>
        <div className="Autocomplete-edit">
          <i className="fa fa-pencil"></i>
        </div>
      </div>
    );
  },
  render: function() {
    var inputRender = this.state.userAssigned ? this.renderAssigned() : this.renderAutocomplete();
    return (
      <div className="FormInput">
        <label for={this.props.id}>{this.props.label}</label>
        {inputRender}
      </div>
    );
  }
});

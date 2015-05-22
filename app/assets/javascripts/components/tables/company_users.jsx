var CompanyUserTable = React.createClass({
  getInitialState: function() {
    var initial = {
      "results": [],
      "checkedItems": []
    };
    return initial;
  },
  componentWillMount: function() {
    $.get("/users", function(result) {
      this.setState({results: result.users});
    }.bind(this));
  },
  buttonList: function() {
    var disabled = this.state.checkedItems.length == 0;
    return(
      <Button onClick={this.DeleteUserClick} disabled={disabled}>Delete</Button>
    );
  },
  DeleteUserClick: function() {
    $.post("/destroy_users",{ids: this.state.checkedItems}, function(success_result) {
      this.spliceResults();
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  spliceResults: function() {
    // this will need to change when pagination is introduced.
    var results = this.state.results;
    for (var i = results.length-1; i >= 0; i--) {
      if(this.state.checkedItems.indexOf(results[i].id) > -1) {
        results.splice(i, 1);
      }
    }
    this.setState({results: results, checkedItems: []});
    return results;
  },
  rowChanged: function(checked, value) {
    var checkedItems = this.state.checkedItems;
    if (checked) {
      checkedItems.push(value);
    }
    else {
      index = checkedItems.indexOf(value);
      checkedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: checkedItems
    })
  },
  getColumns: function() {
    return [
      {name: "", header: "", grow: 1},
      {name: "name", header: "Name", grow: 4},
      {name: "email", header: "Email", grow: 3},
      {name: "company_admin", header: "Admin", grow: 2}
    ];
  },
  render: function() {
    var customRows = this.state.results.map(function(result) {
      var checked = this.state.checkedItems.indexOf(result.id) > -1;
      return(
        <CompanyUserRow checked={checked} data={result} checkChanged={this.rowChanged} />
      );
    }, this);
    return (
      <div className="CompanyUserTableContainer">
        <Table results={this.state.results}
               columns={this.getColumns()}
               checkbox={true}
               buttonList={this.buttonList()}
               useCustomRowComponent={true}
               customRows={customRows}
               title="Users" />
      </div>
    );
  }
});

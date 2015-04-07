var CompanyUserGrid = React.createClass({
  getInitialState: function() {
    var initial = {
      "results": [],
      "checkedItems": []
    };
    return initial;
  },
  componentWillMount: function() {
    $.get("/users", function(result) {
      var users =
      this.setState({results: result.users});
    }.bind(this));
  },
  buttonList: function() {
    return(
      <div>
        <Button onClick={this.DeleteUserClick}>Delete User</Button>
      </div>
    );
  },
  DeleteUserClick: function() {
    $.post("/destroy_users",{ids: this.state.checkedItems}, function(success_result) {
      this.spliceResults();
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  spliceResults: function(results) {
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
  rowChanged: function(e) {
    var checkedItems = this.state.checkedItems;
    if (e.target.checked) {
      checkedItems.push(e.target.value);
    }
    else {
      index = checkedItems.indexOf(e.target.value);
      checkedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: checkedItems
    })
  },
  render: function() {
    var headers = ["", "Email", "Name", "Admin"];
    var columns = ["email", "name", "company_admin"];
    var customRows = this.state.results.map(function(result) {
      var checked = this.state.checkedItems.indexOf(result.id) > -1;
      return(
        <CompanyUserRow checked={checked} data={result} checkChanged={this.rowChanged} />
      );
    }, this);
    return (
      <div className="CompanyUserGrid">
        <Grid results={this.state.results}
              headers={headers}
              checkbox={true}
              buttonList={this.buttonList()}
              useCustomRowComponent={true}
              customRows={customRows} />
      </div>
    );
  }
});

var EventTaskTable = React.createClass({
  getColumns: function() {
    return [
      {name: "name", header: "Name", grow: 1},
      {name: "description", header: "Email", grow: 3},
      {name: "deadline", header: "Deadline", grow: 1}
    ];
  },
  render: function() {
    return (
      <div className="EventTaskTable">
        <Table
          results={this.props.data}
          columns={this.getColumns()}
          useCustomRowComponent={false}
        />
      </div>
    );
  }
});
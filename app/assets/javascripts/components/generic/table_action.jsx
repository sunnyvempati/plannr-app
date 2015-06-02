var TableAction = React.createClass({
  getTrigger: function() {
    return (
      <div className="TableSort-display u-clickable">
        <i className="fa fa-ellipsis-v ActionIcon"></i>
      </div>
    )
  },
  render: function() {
    return (
      <DropdownMenu trigger={this.getTrigger()}
                    header="Actions"
                    items={this.props.items} />
    );
  }
});

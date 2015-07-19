var TaskRow = React.createClass({
  //TODO: figure out and add isRequired for these props
  propTypes: {
    data: React.PropTypes.object,
    actionItems: React.PropTypes.array,
    columns: React.PropTypes.array,
    onClick: React.PropTypes.func,
    global: React.PropTypes.bool,
    checkChanged: React.PropTypes.func
  },
  handleActionClick: function(item) {
    item.handler(this.props.data.id);
  },
  getActionTrigger: function() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction"></i>
      </div>
    )
  },
  getRowActionMenu: function() {
    var globalItems = this.props.actionItems.map(function(item) {
      return (
        <div className="DropdownMenu-item"
             onClick={this.handleActionClick.bind(this, item)}
             key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    return (
      <div className="TableRow-actions">
        {globalItems}
      </div>
    )
  },
  renderEventColumn: function() {
    return (
      <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-10">
        {this.props.data.event}
      </div>
    )
  },
  render: function() {
    var data = this.props.data;
    var completed = data.status == 'Completed';
    var rowClasses = classNames({
      'Table-row': true,
      'task-selected': completed
    });
    var clickable = this.props.global ? "" : "u-clickable";
    var eventColumn = this.props.global ? this.renderEventColumn() : null;
    var deadlineIcon = completed ? "" : TaskDeadline.renderDeadlineIcon(data.deadline);
    return (
      <div className={rowClasses}>
        <div className="Table-checkbox u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkChanged}
                         value={data.id}
                         checked={completed}
                         rounded={true} />
        </div>
        <div onClick={this.props.onClick} className={"Table-rowItem u-flexGrow-10 u-clickable"}>{data.name}</div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-1">{deadlineIcon}</div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-4">{data.deadline}</div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-4">{data.status}</div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-4">{data.assigned_to}</div>
        {eventColumn}
        <DropdownMenu trigger={this.getActionTrigger()}
                      customOptions={this.getRowActionMenu()}
                      align="right" />
      </div>
    );
  }
});

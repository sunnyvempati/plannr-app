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
  taskDuedateNotification: {
    overdue: 0,
    approaching: 7
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
  renderDeadlineIcon: function (deadlineString) {
    //Javascript assumes a date in YYYY-MM-DD is in UTC and will convert it to local time; I don't want this
    //see here: http://stackoverflow.com/questions/15517024/how-to-assume-local-time-zone-when-parsing-iso-8601-date-string
    var deadline = new Date(deadlineString);
    deadline = new Date( deadline.getTime() + ( deadline.getTimezoneOffset() * 60000 ) );

    var daysUntilDue = NaN;
    if (deadlineString != null) {
      daysUntilDue = DateTimeUtils.dayDiff(Date.now(), deadline);
    }
    var isOverdue = (daysUntilDue <= this.taskDuedateNotification.overdue);
    var isApproaching = (this.taskDuedateNotification.overdue < daysUntilDue  && daysUntilDue  <= this.taskDuedateNotification.approaching);

    var deadlineIconClasses = classNames({
      'fa': true,
      'fa-clock-o': true,
      'fa-lg': true,
      'task-overdue': isOverdue,
      'task-approaching': isApproaching,
      'task-longwayoff': (!isOverdue && !isApproaching)
    });

    return (<i className={deadlineIconClasses}></i>);
  },
  render: function() {
    var data = this.props.data;
    var completed = data.status == 'Completed';
    var rowClasses = classNames({
      'Table-row': true,
      'task-selected': completed
    });
    var eventColumn = this.props.global ? this.renderEventColumn() : null;
    return (
      <div className={rowClasses}>
        <div className="Table-checkbox u-flexGrow-1">
          <CheckboxInput onChange={this.props.checkChanged}
                         value={data.id}
                         checked={completed}
                         rounded={true} />
        </div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-10">{data.name}</div>
        <div onClick={this.props.onClick} className="Table-rowItem u-flexGrow-1">{this.renderDeadlineIcon(data.deadline)}</div>
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

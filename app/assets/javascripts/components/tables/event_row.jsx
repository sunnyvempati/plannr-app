var EventRow = React.createClass({
  getInitialState: function() {
    return {
      archived: this.props.event.status == 2
    };
  },
  toggleArchive: function() {
    var archived = !this.state.archived;
    var url = "/events/" + this.props.event.id + ".json";
    var params = {
      event: {
        status: archived ? 2 : 1
      }
    };
    HttpHelpers.putToServer(url, params, function(result) {
      this.setState({archived: archived});
    }.bind(this));
  },
  goToEvent: function(id) {
    location.href = "/events/" + id + "/";
  },
  getActionTrigger: function() {
    return (
      <div className="Table-actionTrigger">
        <i className="fa fa-ellipsis-v TableRowAction EventTableIcon"></i>
      </div>
    )
  },
  handleActionClick: function(event, action) {
    action.handler(event.id);
  },
  getRowActionMenu: function() {
    var globalItems = this.props.actionItems.map(function(item) {
      return (
        <div className="DropdownMenu-item"
             onClick={this.handleActionClick.bind(this, this.props.event, item)}
             key={item.name}>
          {item.name}
        </div>
      )
    }.bind(this));
    var archiveDisplay = this.state.archived ? "Restore" : "Archive";
    return (
      <div className="TableRow-actions">
        <div className="DropdownMenu-item"
             onClick={this.toggleArchive}>
          {archiveDisplay}
        </div>
        {globalItems}
      </div>
    )
  },
  render: function() {
    var hideCheckbox = this.props.checkedItems.length > 0 ? false : true;
    var event = this.props.event;
    var checked = this.props.checkedItems.indexOf(event.id) > -1;
    var daysTill = !!event.days_till ? event.days_till + " days left" : "";
    var daysTill = this.state.archived ? "ARCHIVED" : daysTill;
    var daysTillClasses = classNames({
      'EventsTable-rowDaysTill': true,
      'u-dim': this.state.archived,
      'u-italics': this.state.archived
    });
    return (
      <div className="EventsTable-row" key={event.id}>
        <div className="EventsTable-rowHeader">
          <div className="EventsTable-rowName">
            <div className="EventsTable-checkbox">
              <CheckboxInput onChange={this.rowChanged} value={event.id} checked={checked} hideCheckbox={hideCheckbox} />
            </div>
            <div className="EventsTable-name u-clickable" onClick={this.goToEvent.bind(this, event.id)}>
              {event.name}
            </div>
          </div>
          <div className={daysTillClasses}>
            {daysTill}
          </div>
          <DropdownMenu trigger={this.getActionTrigger()}
                        customOptions={this.getRowActionMenu()}
                        align="right" />
        </div>
        <div className="EventsTable-rowContent">
          <Event model={event} client={event.client} editable={false} />
        </div>
      </div>
    );
  }
});

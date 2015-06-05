var EventAttachmentsTable = React.createClass({
  mixins: [TableCheckbox],
  getInitialState: function () {
    return {
      eventAttachments: []
    };
  },
  componentDidMount: function () {
    this.retrieveData();
  },
  retrieveData: function (){
    $.get("attachments", function (results) {
      if (this.isMounted()) {
        this.setState({
          eventAttachments: results.attachments
        })
      }
    }.bind(this))
  },
  getColumns: function () {
    return [
      {name: "file_name", grow: 10, header: "File Name"}
    ];
  },
  actionItems: function () {
    return [
      {name: "Delete", handler: this.handleDelete}
    ]
  },
  sortItems: function () {
    return [
      {entity: "file_name", display: "File Name", default: true}
    ]
  },
  //TODO: rename to delete
  handleDelete: function (id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    $.post("attachments/mass_delete", destroyOpts, function (success_result) {
      var newData = this.spliceResults(this.state.eventAttachments, deletionIds);
      this.setState({eventAttachments: newData});
    }.bind(this)).fail(function (error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function (entity, order) {
    $.get('attachments.json', {sort: {entity: entity, order: order}}, function (result) {
      this.setState({eventAttachments: result.attachments});
    }.bind(this));
  },
  search: function (e) {
    var term = e.target.value;
    $.get('search_event_attachments', {search: {text: term || ""}}, function (result) {
      this.setState({eventAttachments: result.attachments});
    }.bind(this));
  },
  handleActionClick: function (item, attachmentId) {
    item.handler(attachmentId);
  },
  getRowActionMenu: function (attachmentId) {
    var ai = this.actionItems();
    var globalItems = ai.map(function (item) {
      return (
          <div className="DropdownMenu-item"
               onClick={this.handleActionClick.bind(this, item, attachmentId)}
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
  getActionTrigger: function () {
    //just the "thing" that is clickable?
    return (
        <div className="Table-actionTrigger">
          <i className="fa fa-ellipsis-v TableRowAction"></i>
        </div>
    )
  },
  getCustomRows: function () {
    var hideCheckbox = this.state.checkedItems.length > 0 ? false : true;
    return this.state.eventAttachments.map(function (attachment) {
      var checked = this.state.checkedItems.indexOf(attachment.id) > -1;
      return (
          <div className="Table-row" key={attachment.id}>
            <div className="Table-checkbox u-flexGrow-1">
              <CheckboxInput onChange={this.rowChanged}
                             value={attachment.id}
                             checked={checked}
                             hideCheckbox={hideCheckbox}/>
            </div>
            <div className="Table-rowItem u-flexGrow-10">
              <a href={attachment.file_link.url} target='_blank'>{attachment.file_name}</a>
            </div>
            <DropdownMenu
                trigger={this.getActionTrigger()}
                customOptions={this.getRowActionMenu(attachment.id)}
                align="right"/>
          </div>

      );
    }, this);
  },
  getActionButtonWrapper: function () {
    return (
        <ActionButton handleClick={this.openAddModal}
                      label='Add Contact'
                      svgClass='createContact'
                      extraPad={false}/>
    );
  },
  getActionButton: function () {
    return (
       <AttachmentActionButtonUpload wrapperXxx={this.getActionButtonWrapper()} onAssociation={this.retrieveData}/>
    );
  },
  render: function () {
    return (
        <Table
            results={this.state.eventAttachments}
            columns={this.getColumns()}
            useCustomRowComponent={true}
            showHeaders={true}
            customRows={this.getCustomRows()}
            checkedItems={this.state.checkedItems}
            rowChanged={this.rowChanged}
            sortItems={this.sortItems()}
            handleSortClick={this.sortBy}
            handleSearch={this.search}
            showActions={this.state.checkedItems.length > 0}
            actionItems={this.actionItems()}
            extraPadding={false}
            tableDataClassName="scrollable"
            searchPlaceholder="Search Attachments..."
            actionButton={this.getActionButton()}
            />
    );
  }
});

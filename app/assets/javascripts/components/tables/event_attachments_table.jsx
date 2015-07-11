var EventAttachmentsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort
  ],
  propTypes: {
    setServerMessage: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      eventAttachments: []
    };
  },
  componentDidMount: function () {
    var defaultParams = {
      sort: {sorted_by: 'file_name_asc'},
      filter: {with_event_id: this.props.eventId}
    };
    this.initializeFilterSort(defaultParams);
  },
  getTableData: function (params) {
    HttpHelpers.getFromServer("/attachments.json", params, function (results) {
      if (this.isMounted()) {
        this.setState({
          eventAttachments: results.attachments
        })
      }
    }.bind(this))
  },
  handleAssociation: function (attachment) {
    this.reloadData();
    ToastMessages.toast(attachment.file_name + " has been added to this event.");
  },
  columns: function () {
    return [
      {name: "file_name", grow: 10, header: "File Name"}
    ];
  },
  actionItems: function () {
    return [
      {name: "Delete", handler: this.handleDelete, massAction: true}
    ]
  },
  sortItems: function () {
    return [
      {entity: "file_name", display: "File Name", default: true}
    ]
  },
  handleDelete: function (id) {
    var deletionIds = !!id ? [id] : this.state.checkedItems;
    var destroyOpts = {destroy_opts: {ids: deletionIds}};
    HttpHelpers.postToServer("attachments/mass_delete", destroyOpts, function () {
      this.toast(deletionIds.length + " attachment(s) removed from event.");
      var newData = this.spliceResults(this.state.eventAttachments, deletionIds);
      this.setState({eventAttachments: newData});
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
    var hideCheckbox = this.state.checkedItems.length <= 0;
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
  getAttachmentButtonClickableElement: function () {
    return (
        <ActionButton handleClick={this.openAddModal}
                      svgClass='createAttachment'
                      extraPad={false}/>
    );
  },
  getActionButton: function () {
    return (
        <AttachmentBrowse clickableElement={this.getAttachmentButtonClickableElement()}
                          onAssociation={this.handleAssociation} />
    );
  },
  render: function () {
    return (
        <Table
            results={this.state.eventAttachments}
            columns={this.columns()}
            useCustomRowComponent={true}
            showHeaders={true}
            customRows={this.getCustomRows()}
            checkedItems={this.state.checkedItems}
            rowChanged={this.rowChanged}
            sortItems={this.sortItems()}
            handleSortClick={this.sort}
            handleSearch={this.search}
            showActions={this.state.checkedItems.length > 0}
            actionItems={this.actionItems()}
            extraPadding={false}
            tableDataClassName="scrollable"
            searchPlaceholder="Search Attachments..."
            actionButton={this.getActionButton()}
            handleCheckAllChanged={this.toggleCheckAll}
        />
    );
  }
});

var EventAttachmentsTable = React.createClass({
  mixins: [
    TableCheckbox,
    ToastMessages,
    LoadingToast,
    FilterSort,
    InfiniteScrollMixin
  ],
  propTypes: {
    setServerMessage: React.PropTypes.func
  },
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'file_name_asc'},
      filter: {with_event_id: this.props.eventId}
    };
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    var params = this.mergeParams();
    Utils.get("/attachments.json", params, function(result) {
      if (result.attachments.length == 0) {
        // stop infinite scroll
        this.detachScrollListener();
        return;
      }
      this.setState({
        data: this.state.data.concat(result.attachments),
        page: this.page
      });
    }.bind(this));
  },
  handleAssociation: function (attachment) {
    this.resetPage();
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
    Utils.post("attachments/mass_delete", destroyOpts, function () {
      this.toast(deletionIds.length + " attachment(s) removed from event.");
      var newData = this.spliceResults(this.state.data, deletionIds);
      this.setState({data: newData});
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
    return this.state.data.map(function (attachment) {
      var checked = this.state.checkedItems.indexOf(attachment.id) > -1;
      return (
          <div className="Table-row" key={attachment.id}>
            <div className="Table-checkbox u-flexGrow-1">
              <CheckboxInput onChange={this.rowChanged}
                             value={attachment.id}
                             checked={checked}
                             hideCheckbox={hideCheckbox}/>
            </div>
            <div className="Table-rowItem u-wrapWithEllipsis u-flexGrow-10">
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
            results={this.state.data}
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

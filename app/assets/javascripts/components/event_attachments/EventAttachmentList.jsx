import FilterSort from '../mixins/FilterSort';
import InfiniteScrollMixin from '../mixins/InfiniteScrollMixin';
import AttachmentActions from '../../actions/AttachmentActions';
import EventAttachmentStore from '../../stores/EventAttachmentStore';
import Table from '../generic/Table';
import ActionButton from '../generic/ActionButton';
import TableCheckbox from '../mixins/TableCheckbox';
import CheckboxInput from '../generic/CheckboxInput';
import DropdownMenu from '../generic/DropdownMenu';
import AttachmentBrowse from './AttachmentBrowse';

var EventAttachmentsList = React.createClass({
  mixins: [
    TableCheckbox,
    FilterSort,
    InfiniteScrollMixin
  ],
  defaultFilterSortParams: function() {
    return {
      sort: {sorted_by: 'file_name_asc'},
      filter: {with_event_id: this.props.eventId}
    };
  },
  componentDidMount() {
    EventAttachmentStore.addChangeListener(this._onViewAttachmentsChange);
  },
  componentDidUpdate: function() {
    if (!EventAttachmentStore.attachmentsLoading &&
        !EventAttachmentStore.eventAttachmentsLoaded ||
        this.nextPage == 1)
      this.attachScrollListener();
  },
  componentWillUnmount() {
    EventAttachmentStore.removeChangeListener(this._onViewAttachmentsChange);
  },
  _onViewAttachmentsChange() {
    this.setState({data: EventAttachmentStore.viewEventAttachments});
  },
  fetchNextPage: function(nextPage) {
    this.page = nextPage;
    let params = this.mergeParams();
    if (EventAttachmentStore.isCached(params)) {
      // This is dangerous because we're manipulating the Store
      // BUT!
      // We're using ViewStore as a helper to manage our viewed items.
      EventAttachmentStore.addCachedEventAttachmentsToView(params);
      this.setState({data: EventAttachmentStore.viewEventAttachments});
    } else AttachmentActions.getAttachments(params);
    this.setState({checkedItems: []});
  },
  columns: function () {
    return [
      {name: "file_name", grow: 10, header: "File Name"},
      {name: "size", grow: 10, header: "File Size"},
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
    AttachmentActions.delete(deletionIds);
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
              <a href={attachment.url} target='_blank'>{attachment.file_name}</a>
            </div>
            <div className="Table-rowItem u-flexGrow-10">
              {attachment.size}
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
                          onAssociation={this.handleAssociation}
                          eventId={this.props.params.id} />
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

export default EventAttachmentsList;

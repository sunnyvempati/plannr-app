//TODO: change row so filename is displayed, but linked in pop-up

var EventAttachmentsTable = React.createClass({
  mixins: [TableCheckbox],
  getColumns: function() {
    return [
      {name: "file_name", grow: 4},
      {name: "description", grow: 6}
    ];
  },
  actionItems: function() {
    return [
      {name: "Remove from event", handler: this.removeAssociation}
    ]
  },
  sortItems: function() {
    return [
      {entity: "file_name", display: "File Name", default: true},
      {entity: "description", display: "Description"}
    ]
  },
  removeAssociation: function() {
    var destroyOpts = {destroy_opts: {ids: this.state.checkedItems}};
    $.post("attachments/mass_delete", destroyOpts, function(success_result) {
      var newData = this.spliceResults(this.props.data);
      this.props.onUpdatedData(newData);
    }.bind(this)).fail(function(error_result) {
      this.props.setServerMessage(error_result.responseJSON.message);
    }.bind(this));
  },
  sortBy: function(entity, order) {
    $.get('attachments.json', {sort: {entity: entity, order: order}}, function(result) {
      this.props.onUpdatedData(result.attachments);
    }.bind(this));
  },
  search: function(e) {
    var term = e.target.value;
    $.get('search_event_attachments', {search: {text: term || ""}}, function(result) {
      this.props.onUpdatedData(result.attachments);
    }.bind(this));
  },
  // openAttachmentModal: function(data) {
  //   var attachment = {
  //     id: data.attachment_id,
  //     file_name: data.file_name,
  //     description: data.description,
  //     file_attachment: data.file_attachment
  //   };
  //   var modal = React.createElement(ShowAttachmentModal, {data: attachment});
  //   React.render(modal, document.getElementById('modal'));
  // },
  render: function() {
    return (
      <div>
        <ActionButton class="ActionButton-attachment" path="/attachments/new" label="Create Attachment" prerender="true" />
         <Table
          results={this.props.data}
          columns={this.getColumns()}
          useCustomRowComponent={false}
          checkedItems={this.state.checkedItems}
          rowChanged={this.rowChanged}
          sortItems={this.sortItems()}
          handleSortClick={this.sortBy}
          handleSearch={this.search}
          showActions={this.state.checkedItems.length > 0}
          actionItems={this.actionItems()}
          extraPadding={false}
          searchPlaceholder="Search Attachments..."
        />
      </div>
    );
  }
});

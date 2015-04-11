var EventFormShowBig = React.createClass({
  render: function () {
    var action = "/events";
    return (
      <div>


            <VendorAssociationEditor associatedObjectId={this.props.model.id}
              retrieveAssociatedDataUrl = {"/events/" + this.props.model.id + "/associated_vendors"}
              retrieveUnassociatedDataUrl = {"/events/" + this.props.model.id + "/unassociated_vendors"}
            />
            <hr />

            <ContactAssociationEditor associatedObjectId={this.props.model.id}
              retrieveAssociatedDataUrl = {"/events/" + this.props.model.id + "/associated_contacts"}
              retrieveUnassociatedDataUrl = {"/events/" + this.props.model.id + "/unassociated_contacts"}
            />
  
  <hr />
        <EventForm
          action= {action}
          model={this.props.model}
          disableForm={true}
          showButtonList={false}
          notice={this.props.notice}
        />
      </div>
      );
  }
});


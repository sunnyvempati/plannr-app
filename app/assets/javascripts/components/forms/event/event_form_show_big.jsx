var EventFormShowBig = React.createClass({

  render: function () {
    var action = "/events";

    return (
      <div>

        <ContactAssociationEditor 
          associatedObjectId={this.props.model.id} 
          retrieveAssociatedDataUrl={"/events/" + this.props.model.id + "/associated_contacts"}
          retrieveUnassociatedDataUrl={"/events/" + this.props.model.id + "/unassociated_contacts"}
          />
          
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


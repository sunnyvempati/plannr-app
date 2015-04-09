var EventFormShowBig = React.createClass({
  getInitialState: function() {
    return {
      unassociated_contacts:  this.props.unassociated_contacts,
       associated_contacts:  this.props.associated_contacts
    };
  },
  callback: function() {
    console.log('boom');
    unassociated_contacts: this.refs.unass.getData();
    associated_contacts: this.refs.ass.getData();
  },
  render: function () {
    var action = "/events";

    return (
      <div>
       
        <ContactAssociationEditor associatedObjectId={this.props.model.id} />
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


var EventFormShowBig = React.createClass({
  render: function () {
    var action = "/events";

    return (
      <div>
        unassociated_contacts:
        <ContactFormSelect items={this.props.unassociated_contacts} associated={false} eventId={this.props.model.id} />
        associated_contacts:
        <ContactFormSelect items={this.props.associated_contacts} associated={true} eventId={this.props.model.id} />
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


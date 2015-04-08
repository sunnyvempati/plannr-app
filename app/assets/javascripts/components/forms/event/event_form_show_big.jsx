var EventFormShowBig = React.createClass({
  render: function () {
    var action = "/events";

    return (
      <div>
        <div><div>
          <ContactAutoComplete eventId={this.props.model.id} /> <br/>
            unassociated_contacts:
            <ContactFormSelect items={this.props.unassociated_contacts} associated={false} eventId={this.props.model.id} />
          </div>
          <div>
            associated_contacts:
            <ContactFormSelect items={this.props.associated_contacts} associated={true} eventId={this.props.model.id} />
          </div>
        </div>
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


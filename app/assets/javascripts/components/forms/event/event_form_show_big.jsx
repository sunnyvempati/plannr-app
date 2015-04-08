var EventFormShowBig = React.createClass({
  callback: function() {

    console.log('boom');

    this.refs.ass.forceUpdate();
    this.refs.unass.forceUpdate();
  },
  render: function () {
    var action = "/events";

    return (
      <div>
        <div>
          <div>
            <ContactAutoComplete eventId={this.props.model.id} /> <br/>
            unassociated_contacts:
            <ContactFormSelect ref='unass' items={this.props.unassociated_contacts} associated={false} eventId={this.props.model.id} callback={this.callback} />
          </div>
          <div>
            associated_contacts:
            <ContactFormSelect ref='ass' items={this.props.associated_contacts} associated={true} eventId={this.props.model.id} callback={this.callback} />
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


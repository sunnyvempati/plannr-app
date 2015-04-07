var ContactFormSelect = React.createClass({
  render: function() {
    var createItem = function(item, index, isAssociated, eventId) {
      if (isAssociated) {
        return <li key={index} value={item.id}>{item.name}({item.email})
          <RemoveLink contactId={item.id} eventId={eventId} />
        </li>;
      }
      else{
        return <li key={index} value={item.id}>{item.name}({item.email})
        <AddLink contactId={item.id} eventId={eventId} /></li>;  
      }
    };
    return <ul>{this.props.items.map(
      function(value, index) { return createItem(value, index, !!this.props.associated, this.props.eventId); }, this)}</ul>;
  }
});

var AddLink = React.createClass({
  render: function() {
    var 
      href = "/event_contacts?contact_id=" + this.props.contactId + "&event_id=" + this.props.eventId,
      dataMethod = "post";

      return <a   rel="nofollow" 
                  data-method={dataMethod} 
                  href={href}> add </a>;

  }
});

var RemoveLink = React.createClass({
  render: function() {
    var href = "/event_contacts?contact_id=" + this.props.contactId + "&event_id=" + this.props.eventId,
      dataMethod = "delete";

      return <a   data-confirm="Are you sure?" 
                  rel="nofollow" 
                  data-method={dataMethod} 
                  href={href}> remove </a>;

  }
});

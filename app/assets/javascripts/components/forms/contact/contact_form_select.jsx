var ContactFormSelect = React.createClass({
  onSuccessAdd: function() {
    console.log('hi');
    this.props.callback();
    this.forceUpdate();
  },
  onSuccessRemove: function() {
    console.log('goodbye');
    this.props.callback();
    this.forceUpdate();
  },
  render: function() {
    var _this = this;
    var createItem = function(item, index, isAssociated, eventId) {
      if (isAssociated) {
        return <li key={index} value={item.id}>{item.name}({item.email})
        <RemoveLink contactId={item.id} eventId={eventId} onSuccess={_this.onSuccessRemove} />
        </li>;
      }
      else{
        return <li key={index} value={item.id}>{item.name}({item.email})
        <AddLink contactId={item.id} eventId={eventId} onSuccess={_this.onSuccessAdd} /></li>;  
      }
    };
    return <ul>{this.props.items.map(
      function(value, index) { return createItem(value, index, !!this.props.associated, this.props.eventId); }, this)}</ul>;
  }
});

var AddLink = React.createClass({
  ajaxAdd : function() {
    var _this = this;
    $.ajax({
      url: "/event_contacts?contact_id=" + _this.props.contactId + "&event_id=" + _this.props.eventId,
      dataType: "json",
      type: "post",
      success: function( data ) {
        _this.props.onSuccess();
      },
      error: function(jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
  },

  render: function() {
    return <a rel="nofollow" href='#' onClick={this.ajaxAdd}> add </a>;
  }
});

var RemoveLink = React.createClass({
  ajaxRemove : function() {
    var _this = this;
    $.ajax({
      url: "/event_contacts?contact_id=" + _this.props.contactId + "&event_id=" + _this.props.eventId,
      dataType: "json",
      type: "delete",
      success: function( data ) {
        _this.props.onSuccess();
      },
      error: function(jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
  },
  render: function() {
    return <a data-confirm="Are you sure?" rel="nofollow" href='#' onClick={this.ajaxRemove}> remove </a>;
  }
});

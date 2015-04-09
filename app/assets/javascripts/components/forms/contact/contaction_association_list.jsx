var ContactAssociationList = React.createClass({
  getInitialState: function() {
    
    if (typeof this.props.items ==='undefined') {
      console.log('items undefined in list gis')
    }
    return {
      items: this.props.items,
      onSuccessCallback: this.props.onSuccessCallback
    };
  },
  render: function () {
    var _this = this;
    if (typeof this.props.items ==='undefined') {
      console.log('items undefined in list render')
    }
    
    var createItem = function (item, index, isAssociated, eventId) {
      if (isAssociated) {
        return <li key={index} value={item.id}>{item.name}({item.email})
        <RemoveLink contactId={item.id} eventId={eventId} onSuccessCallback={_this.props.onSuccessCallback} />
        </li>;
      }
      else{
        return <li key={index} value={item.id}>{item.name}({item.email})
        <AddLink contactId={item.id} eventId={eventId} onSuccessCallback={_this.props.onSuccessCallback} /></li>;  
      }
    };
    return <ul>{this.props.items.map(
      function (value, index) { return createItem(value, index, !!this.props.associated, this.props.associatedObjectId); }, this)}</ul>;
  }

});

var AddLink = React.createClass({
  ajaxAdd : function () {
    
    var _this = this;
    
    $.ajax({
      url: "/event_contacts?contact_id=" + _this.props.contactId + "&event_id=" + _this.props.eventId,
      dataType: "json",
      type: "post",
      success: function ( data ) {
        _this.props.onSuccessCallback();
      },
      error: function (jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
  },

  render: function () {
    return <a rel="nofollow" href='#' onClick={this.ajaxAdd}> add </a>;
  }
});

var RemoveLink = React.createClass({
  getInitialState: function () {
      return {
          onSuccessCallback: this.props.onSuccessCallback  
      };
  },
  ajaxRemove : function () {
    var _this = this;
    
    $.ajax({
      url: "/event_contacts?contact_id=" + _this.props.contactId + "&event_id=" + _this.props.eventId,
      dataType: "json",
      type: "delete",
      success: function ( data ) {
        _this.props.onSuccessCallback();
      },
      error: function (jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
  },
  render: function () {
    return <a rel="nofollow" href='#' onClick={this.ajaxRemove}> remove </a>;
  }
});


//TODO: make Add/Remove more generic
var MyLink = React.createClass({

  render: function() {
    return (
      <a rel="nofollow" href='#' onClick={this.props.onClick}> remove </a>
    );
  }

});



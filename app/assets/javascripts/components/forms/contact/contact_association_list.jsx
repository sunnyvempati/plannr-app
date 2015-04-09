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
    
    var createItem = function (item, index, isAssociated, associatedObjectId) {
      if (isAssociated) {
        return <li key={index} value={item.id}>{item.name} [{item.email}]
        <EventContactsLinkAsync contactId={item.id} associatedObjectId={associatedObjectId} onSuccessCallback={_this.props.onSuccessCallback} text='Remove' type='delete'/>
        </li>;
      }
      else{
        return <li key={index} value={item.id}>{item.name} [{item.email}]
        <EventContactsLinkAsync contactId={item.id} associatedObjectId={associatedObjectId} onSuccessCallback={_this.props.onSuccessCallback} text='Add' type='post' /></li>;  
      }
    };
    return <ul>{this.props.items.map(
      function (value, index) { return createItem(value, index, !!this.props.associated, this.props.associatedObjectId); }, this)}</ul>;
  }

});

var EventContactsLinkAsync = React.createClass({
  onClickAsync: function() {
    var _this = this;
    $.ajax({
      url: "/event_contacts?contact_id=" + _this.props.contactId + "&event_id=" + _this.props.associatedObjectId,
      dataType: "json",
      type: _this.props.type,
      success: function ( data ) {
        _this.props.onSuccessCallback();
      },
      error: function (jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
  },

  render: function() {
    return (
      <a rel="nofollow" href='#' onClick={this.onClickAsync}>{this.props.text}</a>
      );
  }
});



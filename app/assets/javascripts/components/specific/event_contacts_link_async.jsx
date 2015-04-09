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

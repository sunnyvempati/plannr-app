var EventAssociationAddRemoveLinkAsync = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['post', 'delete']).isRequired,
    text: React.PropTypes.string.isRequired
  },
  onClickAsync: function() {
    var _this = this;
    $.ajax({
      url: _this.props.url,
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

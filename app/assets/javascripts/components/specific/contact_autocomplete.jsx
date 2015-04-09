var ContactAutoComplete = React.createClass({
  propTypes: {
    associatedObjectId: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    var _this = this;
    var associatedObjectId = this.props.associatedObjectId;
    $(React.findDOMNode(this))
    .autocomplete({
      source: function( request, response ) {

        $.ajax({
          url: "/contacts/search",
          dataType: "json",
          data: {
            searchText: request.term,
            associated: false,
            associatedObjectId: associatedObjectId
          },
          success: function( data ) {
              //add a record for the creation of a contact
              data.data.splice(0,0,{email: "Create ...", name:data.searchText, id:-1});

              //format response to be array of strings
              response( $.map(data.data, function (item) {
                return { 
                  label: item.name, 
                  value: '', 
                  id: item.id,
                  desc: item.email};
                }) );
            },
            error: function(jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
      },
      minLength: 2,
      delay:300})
.autocomplete("instance")
._renderItem = function(ul, item) {
  return _this.customRenderItem(ul, item, _this.ajaxAdd)};
},
onSuccess: function() {
  this.props.callback();
},
ajaxAdd : function(itemId, searchText) {
  var _this = this;
  var url = "/event_contacts?event_id=" + _this.props.associatedObjectId;
  url = url + "&contact_id=" + itemId;
  if (typeof searchText !== 'undefined') {
    url = url + "&searchText=" + searchText;
  }

  $.ajax({
    url: url,
    dataType: "json",
    type: "post",
    success: function( data ) {
      _this.props.callback();
    },
    error: function(jqXHR, textStatus, errorThrown) {
              //TODO: better error handling
              throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
            }
          });
},
customRenderItem: function( ul, item, clickerThingee ) {
  var a = $('<a href="#">').text('+');
  a.click(function(){ 
    clickerThingee(item.id, item.label); 
    $('#contact_autocomplete').val('');
  });

  return $( "<li>" )
  .append( item.label + "<br>")
  .append( item.desc   )
  .append ( a )
  .appendTo( ul );
},
componentWillUnmount: function() {
  $(React.findDOMNode(this)).autocomplete('destroy');
},
render: function () {
  return (
    <input type='text' name='contact' id='contact_autocomplete'/>
    );
}
});



var MyLi = React.createClass({

  render: function() {
    return (
      <li>
      {this.props.label}<br />
      {this.props.desc}
      <AddLink contactId={this.props.contactId} associatedObjectId={this.props.associatedObjectId} searchText={this.props.searchText} />
      </li>
      );
  }

});




var ContactAutoComplete = React.createClass({
  componentDidMount: function() {
    var event_id = this.props.eventId;
    $(React.findDOMNode(this))
    .autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "/contacts/search",
          dataType: "json",
          data: {
            searchText: request.term,
            associated: false,
            eventId: event_id
          },
          success: function( data ) {
              //format response to be array of strings
              response( $.map(data.data, function (item) {
                return { 
                  label: item.name, 
                  value: item.name, 
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
      minLength: 2})
    .autocomplete("instance")
    ._renderItem = this.customRenderItem;
  },
  customRenderItem: function( ul, item ) {
    //TODO: figure out how to use existing React component
    var href = "/event_contacts?contact_id=" + item.id + "&event_id=" + this.props.eventId;
    var a = '<a data-method="post" rel="nofollow" href="' + href + '"> + </a>';
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


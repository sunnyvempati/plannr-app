var ContactAutoComplete = React.createClass({
  retrieveDataAsync: function (context, url, data, responseCallback) {
    $.ajax({
      context: context,
      url: url,
      dataType: "json",
      type: "get",
      data: data
    }).done(function (result){
      //add a record for the creation of a contact
      result.data.splice(0,0,{email: "Create ...", name:result.searchText, id:-1});
        //format response to be array of strings
        responseCallback( $.map(result.data, function (item) {
          return { 
            label: item.name, 
            value: '', 
            id: item.id,
            desc: item.email};
          }) );
      } )
    .fail(function (jqXHR, textStatus, errorThrown) {
        //TODO: better error handling
        throw "jqXHR=" + jqXHR + "; textStatus=" + textStatus + "; errorThrown" + errorThrown;
      });
  },
  onSuccess: function() {
    this.props.callback();
  },
  ajaxAdd : function(itemId, searchText) {
    //TODO: cleanup URLs, add specific add and add/create ?
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
  propTypes: {
    associatedObjectId: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func.isRequired
  },
/* React Methods */
  componentDidMount: function() {
    var _this = this;
    var associatedObjectId = this.props.associatedObjectId;
    $(React.findDOMNode(this))
    .autocomplete({
      source: function( request, response ) {
        var data =  {
          searchText: request.term,
          associated: false,
          associatedObjectId: associatedObjectId
        };
        _this.retrieveDataAsync(_this, '/contacts/search', data, response);
      },
      minLength: 2,
      delay:300})
    .autocomplete("instance")
    ._renderItem = function(ul, item) {
      return _this.customRenderItem(ul, item, _this.ajaxAdd)};
    },

    componentWillUnmount: function() {
      $(React.findDOMNode(this)).autocomplete('destroy');
    },
    render: function () {
      return (
     <input type='text' name='contact' id='contact_autocomplete' className='TileInput-field' placeholder='+ Contacts Search/Create'/>
       
        );
    }
  });








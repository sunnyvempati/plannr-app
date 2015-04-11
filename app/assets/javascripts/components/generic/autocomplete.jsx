var Autocomplete = React.createClass({
  getId: function() {
    return "#" + this.props.name + "_autocomplete";
  },

  componentDidMount: function() {
    var _this = this;
    var associatedObjectId = this.props.associatedObjectId;
    var dataRetrieved = this.props.retrieveDataAsync;
    var itemSelected = this.props.itemSelected;
    $(this.getId()).autocomplete({
      source: dataRetrieved,
      select: itemSelected
    }).autocomplete("instance")._renderItem = function(ul, item) {
      var li = _this.props.renderAutoCompleteList(item);
      return li.appendTo(ul);
    }.bind(this)
  },
  render: function() {
    return (
      <div className="Autocomplete">
        <input name={this.props.name}
               id={this.props.name + "_autocomplete"}
               placeholder={"Start typing"}
               className="TileInput-field" />
      </div>
    );
  },
  componentWillUnmount: function() {
    $(this.getId).autocomplete('destroy');
  }
});

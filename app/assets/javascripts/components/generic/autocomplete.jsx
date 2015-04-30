var Autocomplete = React.createClass({
  getjQueryId: function() {
    return "#" + this.props.name + "_autocomplete";
  },
  componentDidMount: function() {
    var _this = this;
    var associatedObjectId = this.props.associatedObjectId;
    var dataRetrieved = this.props.retrieveDataAsync;
    var itemSelected = this.props.itemSelected;
    $(this.getjQueryId()).autocomplete({
      source: dataRetrieved,
      select: itemSelected
    }).autocomplete("instance")._renderItem = function(ul, item) {
      var li = _this.props.renderAutoCompleteList(item);
      return li.appendTo(ul);
    }.bind(this)
  },
  render: function() {
    return (
      <input name={this.props.name}
             id={this.props.name + "_autocomplete"}
             placeholder={"Start typing..."}
             className="Autocomplete" />
    );
  },
  componentWillUnmount: function() {
    $(this.getjQueryId()).autocomplete('destroy');
  }
});

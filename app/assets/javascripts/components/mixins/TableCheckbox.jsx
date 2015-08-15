export default {
  getInitialState: function() {
    return {
      checkedItems: []
    };
  },
  componentWillReceiveProps: function() {
    this.setState({checkedItems: []});
  },
  rowChanged: function(checked, value) {
    var checkedItems = this.state.checkedItems;
    if (checked) {
      checkedItems.push(value);
    }
    else {
      index = checkedItems.indexOf(value);
      checkedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: checkedItems
    });
  },
  toggleCheckAll: function(checked, data) {
    var checkedItems = [];
    if (checked) {
      checkedItems = $.map(data, function(obj) { return obj.id });
    }
    this.setState({checkedItems: checkedItems});
  }
}

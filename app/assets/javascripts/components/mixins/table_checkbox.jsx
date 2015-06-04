var TableCheckbox = {
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
  spliceResults: function(data, ids) {
    return $.map(data, function(item, index) {
      if (ids.indexOf(item.id) === -1) {
        return item;
      }
    });
  },
}

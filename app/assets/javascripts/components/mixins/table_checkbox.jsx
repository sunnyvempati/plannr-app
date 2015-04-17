var TableCheckbox = {
  getInitialState: function() {
    return {
      checkedItems: []
    };
  },
  componentWillReceiveProps: function() {
    this.setState({checkedItems: []});
  },
  rowChanged: function(e) {
    var checkedItems = this.state.checkedItems;
    if (e.target.checked) {
      checkedItems.push(e.target.value);
    }
    else {
      index = checkedItems.indexOf(e.target.value);
      checkedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: checkedItems
    });
  },
  spliceResults: function() {
    var deletedItems = this.state.checkedItems;
    return $.map(this.props.data, function(item, index) {
      if (deletedItems.indexOf(item.id) === -1) {
        return item;
      }
    });
  },
}

var Utils = {
  spliceResults: function(data, ids) {
    return $.map(data, function(item, index) {
      if (ids.indexOf(item.id) === -1) {
        return item;
      }
    });
  }
}
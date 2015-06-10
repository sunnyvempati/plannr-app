var HttpHelpers = {
  postToServer: function(url, params, success) {
    this.showLoading();
    $.post(url, params, function(result) {
      success(result);
      this.closeLoading();
    });
  },
  getFromServer: function(url, params, success) {
    this.showLoading();
    $.get(url, params, function(result) {
      success(result);
      this.closeLoading();
    }.bind(this));
  }
}

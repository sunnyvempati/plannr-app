var HttpHelpers = {
  // TODO: When error, toast.
  postToServer: function(url, params, success) {
    this.showLoading();
    $.post(url, params, function(result) {
      this.closeLoading();
      success(result);
    }.bind(this));
  },
  getFromServer: function(url, params, success) {
    this.showLoading();
    $.get(url, params, function(result) {
      success(result);
      this.closeLoading();
    }.bind(this)).fail(function(error) {
      this.toast("Aw man, something went wrong. Let Plannr know about this!");
    }.bind(this));
  }
}

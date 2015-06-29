var HttpHelpers = {
  // TODO: When error, toast.
  postToServer: function(url, params, success) {
    LoadingToast.showLoading();
    $.post(url, params, function(result) {
      LoadingToast.closeLoading();
      success(result);
    }.bind(this));
  },
  getFromServer: function(url, params, success) {
    LoadingToast.showLoading();
    $.get(url, params, function(result) {
      success(result);
      LoadingToast.closeLoading();
    }.bind(this)).fail(function(error) {
      ToastMessages.toast("Aw man, something went wrong. Let Plannr know about this!");
    }.bind(this));
  }
}

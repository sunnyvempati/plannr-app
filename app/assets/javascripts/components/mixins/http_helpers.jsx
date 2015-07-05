//TODO: rename to inform that this is to handle the ajax calls by adding wrapping toast message (LoadingToast messages)
var HttpHelpers = {
  genericFail: function(jqXHR, textStatus, errorThrown) {
    ToastMessages.toast("Aw man, something went wrong on get. Let Plannr know about this!");
    console.log('Error: ' + errorThrown);
    console.log('jqXHR:');
    console.log(jqXHR);
  },
  postToServer: function(url, params, successCallback, failCallback, alwaysCallback) {
    LoadingToast.showLoading();
    return $.post(url, params)
      .done(function(result) {
        if ($.isFunction(successCallback)) {
          successCallback(result);
        }
      }.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.genericFail(jqXHR, textStatus, errorThrown);
        if ($.isFunction(failCallback)) {
          failCallback(jqXHR, textStatus, errorThrown);
        }
      }.bind(this))
      .always(function() {
        LoadingToast.closeLoading();
        if ($.isFunction(alwaysCallback)) {
          alwaysCallback();
        }
      });
  },
  getFromServer: function(url, params, successCallback, failCallback, alwaysCallback) {
    LoadingToast.showLoading();
    return $.get(url, params)
      .done(function(result) {
        if ($.isFunction(successCallback)) {
          successCallback(result);
        }
      }.bind(this))
      .fail(function(jqXHR, textStatus, errorThrown) {
        this.genericFail(jqXHR, textStatus, errorThrown);
        if ($.isFunction(failCallback)) {
          failCallback(jqXHR, textStatus, errorThrown);
        }
      }.bind(this))
      .always(function() {
        LoadingToast.closeLoading();
        if ($.isFunction(alwaysCallback)) {
          alwaysCallback();
        }
      });
  },
  putToServer: function(url, params, successCallback, failCallback, alwaysCallback) {
    LoadingToast.showLoading();
    $.ajax({
      url: '/comments',
      type: 'PUT',
      data: params,
      success: function(result) {
        successCallback(result);
      },
      complete: function() {
        LoadingToast.closeLoading();
        if ($.isFunction(alwaysCallback)) {
          alwaysCallback();
        }
      },
    });
  },
}

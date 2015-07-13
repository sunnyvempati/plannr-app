var Utils = {
  spliceResults: function(data, ids) {
    return $.map(data, function(item, index) {
      if (ids.indexOf(item.id) === -1) {
        return item;
      }
    });
  },
  genericFail: function(jqXHR, textStatus, errorThrown) {
    ToastMessages.toast("Aw man, something went wrong on get. Let Plannr know about this!");
    console.log('Error: ' + errorThrown);
    console.log('jqXHR:');
    console.log(jqXHR);
  },
  post: function(url, params, successCallback, failCallback, alwaysCallback) {
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
  get: function(url, params, successCallback, failCallback, alwaysCallback) {
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
  put: function(url, params, successCallback, failCallback, alwaysCallback) {
    LoadingToast.showLoading();
    $.ajax({
      url: url,
      type: 'PUT',
      data: params})
    .done(function(result) {
      successCallback(result);
    })
    .always(function() {
      LoadingToast.closeLoading();
      if ($.isFunction(alwaysCallback)) {
        alwaysCallback();
      }
    })
    .fail(function(error) {
      failCallback(error);
    });
  }
}

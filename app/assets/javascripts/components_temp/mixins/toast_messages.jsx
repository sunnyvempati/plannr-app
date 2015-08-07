var ToastMessages = {
  toast: function(message, isError, isNotice) {
    var toast = React.createElement(Toast, {message: message, isError: isError, isNotice: isNotice});
    React.render(toast, document.getElementById('toast'));
    setTimeout(this.closeToast, 3000);
  },
  toastNotice: function(message) {
    this.toast(message, false, true);
  },
  toastError: function(message) {
    this.toast(message, true);
  },
  closeToast: function() {
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}

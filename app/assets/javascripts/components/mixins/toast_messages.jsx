var ToastMessages = {
  toast: function(message, isError) {
    var toast = React.createElement(Toast, {message: message, isError: isError});
    React.render(toast, document.getElementById('toast'));
    setTimeout(this.closeToast, 3000);
  },
  toastError: function(message) {
    this.toast(message, true);
  },
  closeToast: function() {
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}

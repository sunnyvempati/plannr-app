//TODO: allow multiple toast messages - they should pile up
var ToastMessages = {
  toast: function(message) {
    var toast = React.createElement(Toast, {message: message});
    React.render(toast, document.getElementById('toast'));
    setTimeout(this.closeToast, 3000);
  },
  toastError: function(message) {
    var toast = React.createElement(Toast, {message: message});
    React.render(toast, document.getElementById('toast'));
    setTimeout(this.closeToast, 3000);
  },
  closeToast: function() {
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}

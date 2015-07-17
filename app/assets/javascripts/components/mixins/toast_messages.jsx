var ToastMessages = {
  toast: function(message, isError) {
    this.closeToast();
    console.log("unmounted toast");
    var toast = React.createElement(Toast, {message: message, isError: isError});
    React.render(toast, document.getElementById('toast'));
    console.log("toast mounted: " + message);
    setTimeout(this.closeToast, 3000);
  },
  toastError: function(message) {
    this.toast(message, true);
  },
  closeToast: function() {
    console.log("toast close");
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}

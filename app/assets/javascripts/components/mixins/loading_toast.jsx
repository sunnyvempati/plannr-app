var LoadingToast = {
  getLoadingMessage: function(){
    return (
      <div>
        Loading&nbsp;&nbsp;<i className="fa fa-circle-o-notch fa-spin"></i>
      </div>
    )
  },
  showLoading: function() {
    var loadingToast = React.createElement(Toast, {message: this.getLoadingMessage(), loading: true});
    React.render(loadingToast, document.getElementById('toast'));
  },
  closeLoading: function() {
    setTimeout(this.fireClose, 500);
  },
  fireClose: function() {
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}

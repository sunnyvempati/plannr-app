var LoadingToast = {
  getLoadingMessage: function(){
    return (
      <div>
        <i className="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Working...
      </div>
    )
  },
  showLoading: function() {
    var loadingToast = React.createElement(Toast, {message: this.getLoadingMessage(), loading: true});
    React.render(loadingToast, document.getElementById('toast'));
  },
  closeLoading: function() {
    React.unmountComponentAtNode(document.getElementById('toast'));
  }
}
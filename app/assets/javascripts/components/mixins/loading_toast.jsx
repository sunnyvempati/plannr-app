var LoadingToast = {
  showLoading: function() {
    console.log("loading triggered");
    var loadingToast = React.createElement(Toast, {message: this.renderLoadingMessage(), loading: true});
    React.render(loadingToast, document.getElementById('toast'));
  },
  closeLoading: function() {
    console.log("loading closed");
    React.unmountComponentAtNode(document.getElementById('toast'));
  },
  renderLoadingMessage: function(){
    return (
      <div>
        <i className="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Working...
      </div>
    )
  }
}

var FormMixin = {
  getInitialState: function() {
    return {
      canSubmit: true,
      loading: false
    };
  },
  enableButton: function() {
    this.setState({canSubmit: true});
  },
  disableButton: function() {
    console.log("disable");
    this.setState({canSubmit: false});
  },
  removeLoading: function() {
    setTimeout(this.loadingComplete, 1000);
  },
  loadingComplete: function() {
    console.log("loading");
    this.setState({loading: false});
  },
  loadingIcon: function() {
    return <i className="fa fa-circle-o-notch fa-spin"></i>;
  },
  submitForm: function(data, resetModel, invalidateForm) {
    this.setState({loading: true});
    $.post(this.url, data, function(result){
      this.onSuccess(result);
    }.bind(this)).fail(function(error) {
      invalidateForm(JSON.parse(error.responseText));
    }).always(function() {
      this.removeLoading();
    }.bind(this));
  }
}

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
    this.setState({canSubmit: false});
  },
  removeLoading: function() {
    setTimeout(this.loadingComplete, 1000);
  },
  loadingComplete: function() {
    this.setState({loading: false});
  },
  postForm: function(data, reset, invalidate) {
    this.submitForm(data, reset, invalidate, 'post', this.url);
  },
  putForm: function(data, reset, invalidate) {
    this.submitForm(data, reset, invalidate, 'put', this.putUrl);
  },
  submitForm: function(data, resetModel, invalidateForm, actionVerb, url) {
    this.setState({loading: true});
    Utils[actionVerb](url, data, function(result) {
      this.onSuccess(result);
    }.bind(this), function(error) {
      invalidateForm(JSON.parse(error.responseText));
    }, function() {
      this.removeLoading();
    }.bind(this));
  }
}

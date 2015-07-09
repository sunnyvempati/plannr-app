var ButtonListMagic = {
  getInitialState: function() {
    return {
      canSubmit: false,
      loading: false
    };
  },
  componentWillMount: function (){
    //check for required methods
    if (!$.isFunction(this.onFormSubmitSuccess)) {
      console.error('ButtonListMagic Mixin requires function: onFormSubmitSuccess()');
    }

    if (!$.isFunction(this.getFormSubmitParams)) {
      console.error('ButtonListMagic Mixin requires function: onFormSubmitSuccess() ');
    }
  },
  enableSubmit: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableSubmit: function () {
    this.setState({
      canSubmit: false
    });
  },
  removeLoading: function() {
    setTimeout(this.loadingComplete, 500);
  },
  loadingStarted: function() {
    this.setState({loading: true});
  },
  loadingComplete: function() {
    this.setState({loading: false});
  },
  handleButtonClick: function(e) {
    this.setState({clickedButton: e.target})
  },
  onSubmit: function (data, resetForm, invalidateForm) {
    this.loadingStarted();
    var params = this.getFormSubmitParams();
    params.data = data;
    params.callbacks = {
      invalidateForm: this.invalidateForm,
      onFormSubmitSuccess: this.onFormSubmitSuccess,
      loadingComplete: this.loadingComplete
    }
    console.log('ajax');
    console.log(params);
    $.ajax(params)
    .done(function(data, textStatus, jqXHR) {
      console.log('success');
      this.callbacks.onFormSubmitSuccess();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('fail');
      if ($.isFunction(this.callbacks.invalidateForm)) {
        if (jqXHR.status == 403) {
          this.callbacks.invalidateForm(jqXHR.responseJSON);
        }
      }
      this.callbaloadingComplete();
    });
  },
  isSubmitDisabled: function() {
    return (!this.state.canSubmit || this.state.loading);
  },
  isAllButtonsDisabled: function() {
    return this.state.loading;
  }
}

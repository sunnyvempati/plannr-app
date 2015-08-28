import ClassNames from 'classnames';

const Toast = React.createClass({
  getDefaultProps() {
     return {
      loading: false,
      isError: false
     };
   },

  _renderToast() {
    if (this.props.loading) {
      return (
        <div>
          <i className="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Working...
        </div>
      );
    } else {
      return (
        <div>
          {this.props.message}
        </div>
      );
    }
  },

  render() {

    var toastClasses = ClassNames({
      'Toast': true,
      'normal': !this.props.loading,
      'loading': this.props.loading,
      'error': this.props.isError
    });
    return (
      <div className={toastClasses}>
        {this._renderToast()}
      </div>
    )
  }
});

export default Toast;

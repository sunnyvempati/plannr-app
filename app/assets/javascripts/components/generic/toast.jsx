var Toast = React.createClass({
  propTypes: {
    loading: React.PropTypes.bool,
    isError: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      loading: false,
      isError: false
    };
  },
  render: function() {
    var toastClasses = classNames({
      'Toast': true,
      'loading': this.props.loading,
      'error': this.props.isError,
      'notice': this.props.isNotice
    })
    return (
      <div className={toastClasses}>
        {this.props.message}
      </div>
    );
  }
});

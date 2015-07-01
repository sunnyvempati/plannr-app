var Toast = React.createClass({
  getDefaultProps: function() {
    return {
      loading: false
    };
  },
  render: function() {
    var toastClasses = classNames({
      'Toast': true,
      'loading': this.props.loading
    })
    return (
      <div className={toastClasses}>
        {this.props.message}
      </div>
    );
  }
});

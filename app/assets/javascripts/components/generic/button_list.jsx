var ButtonList = React.createClass({
  propTypes: {
    showButtonList: React.PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return  {
      showButtonList: true
    }
  },
  render: function() {
    var containerClasses = classNames({
      'ButtonListContainer': true,
      'u-hidden': !this.props.showButtonList
    });
    return (
      <div className={containerClasses}>
        {this.props.children}
      </div>
    );
  }
});



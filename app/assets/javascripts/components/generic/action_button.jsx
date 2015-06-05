var ActionButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    svgClass: React.PropTypes.string
  },
  render: function() {
    var actionButtonClasses = classNames({
      'ActionButton': true,
      'extraPad': this.props.extraPad
    });
    var svgClass = "ActionButton-" + this.props.svgClass;
    return (
      <div className={actionButtonClasses} onClick={this.props.handleClick}>
        <div className="ActionButton-svg">
          <div className={svgClass}></div>
        </div>
        <div className="ActionButton-label">{this.props.label}</div>
      </div>
    );
  }
});

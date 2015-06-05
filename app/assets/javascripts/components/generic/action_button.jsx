var ActionButton = React.createClass({
  render: function() {
    console.log(this.props.extraPad);
    var actionButtonClasses = classNames({
      'ActionButton': true,
      'extraPad': this.props.extraPad
    });
    return (
      <div className={actionButtonClasses} onClick={this.props.handleClick}>
        <div className="ActionButton-svg">
          <div className="ActionButton-event"></div>
        </div>
        <div className="ActionButton-label">{this.props.label}</div>
      </div>
    );
  }
});

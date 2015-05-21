var ActionButton = React.createClass({
  render: function() {
    return (
      <div className="ActionButton" onClick={this.props.handleClick}>
        <div className="ActionButton-svg">
          <div className={this.props.className}></div>
        </div>
        <div className="ActionButton-label">{this.props.label}</div>
      </div>
    );
  }
});

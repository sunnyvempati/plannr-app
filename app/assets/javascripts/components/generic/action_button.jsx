var ActionButton = React.createClass({
  handleClick: function (href) {
    location.href = href;
  },
  render: function() {
    return (
      <div className="ActionButton" onClick={this.handleClick.bind(this, this.props.path)}>
        <div className="ActionButton-svg">
          <div className={this.props.class}></div>
        </div>
        <div className="ActionButton-label">{this.props.label}</div>
      </div>
    );
  }
});
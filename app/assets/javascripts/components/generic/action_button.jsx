var ActionButton = React.createClass({
  handleClick: function (href) {
    location.href = href;
  },
  render: function () {
    return (
      <div className='CreateContainer' onClick={this.handleClick.bind(this, this.props.path)}>
        <div className="Button--action">
          <div className="Button--actionIcon">
            <Icon class="fa fa-plus action" />
          </div>
        </div>
      </div>
    );
  }
});